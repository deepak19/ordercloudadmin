"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Auth, Me, Tokens, type MeUser } from "ordercloud-javascript-sdk";

import { BRANDS, DEFAULT_BRAND_ID, getBrand, type Brand } from "@/config/brands";
import { applyBrandConfig } from "@/lib/ordercloud/brand-config";
import { onUnauthorized } from "@/lib/ordercloud/auth-events";

const TOKEN_STORAGE_KEY = "oc_access_token";
const BRAND_STORAGE_KEY = "oc_brand_id";

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: MeUser | null;
  brand: Brand | null;
  login: (brandId: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: MeUser) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<MeUser | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    Tokens.RemoveAccessToken();
    setUser(null);
    router.push("/login");
  }, [router]);

  useEffect(() => {
    async function rehydrate() {
      const storedBrandId = localStorage.getItem(BRAND_STORAGE_KEY) ?? DEFAULT_BRAND_ID;
      const storedBrand = getBrand(storedBrandId) ?? BRANDS[0];
      setBrand(storedBrand);

      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (!token) {
        setIsLoading(false);
        return;
      }

      applyBrandConfig(storedBrand);
      Tokens.SetAccessToken(token);
      try {
        const meUser = await Me.Get();
        setUser(meUser);
      } catch {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        Tokens.RemoveAccessToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    rehydrate();
  }, []);

  useEffect(() => onUnauthorized(logout), [logout]);

  const login = useCallback(
    async (brandId: string, username: string, password: string) => {
      const selectedBrand = getBrand(brandId);
      if (!selectedBrand) {
        throw new Error(`Unknown brand "${brandId}".`);
      }
      if (!selectedBrand.clientID) {
        throw new Error(
          `NEXT_PUBLIC_${brandId.toUpperCase()}_OC_CLIENT_ID is not configured. Set it in .env.local.`,
        );
      }

      applyBrandConfig(selectedBrand);

      const token = await Auth.Login(
        username,
        password,
        selectedBrand.clientID,
        // selectedBrand.scope as ApiRole[]
      );
      if (!token.access_token) {
        throw new Error("Login did not return an access token.");
      }

      localStorage.setItem(TOKEN_STORAGE_KEY, token.access_token);
      localStorage.setItem(BRAND_STORAGE_KEY, brandId);
      Tokens.SetAccessToken(token.access_token);

      const meUser = await Me.Get();
      setUser(meUser);
      setBrand(selectedBrand);
      router.push("/");
    },
    [router],
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading,
        user,
        brand,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
