"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useTheme } from "next-themes";

import { createAppTheme } from "@/config/theme";
import type { Brand } from "@/config/brands";
import { useAuth } from "@/providers/auth-provider";

interface ThemeBrandContextValue {
  setPreviewBrand: (brand: Brand | null) => void;
}

const ThemeBrandContext = createContext<ThemeBrandContextValue | null>(null);

export function ThemeBrandProvider({ children }: { children: React.ReactNode }) {
  const { brand } = useAuth();
  const { resolvedTheme } = useTheme();
  const [previewBrand, setPreviewBrand] = useState<Brand | null>(null);
  const [mounted, setMounted] = useState(false);

  // The brand (from localStorage via auth) and resolved dark/light mode are
  // both client-only values. Rendering them during SSR would produce a theme
  // that mismatches the client's first render, and React does not patch up
  // className differences from a hydration mismatch — so the stale
  // server-rendered theme would stick in the DOM. Gate on mount instead: SSR
  // and the initial client render both use a neutral default theme, then a
  // real (non-hydration) re-render swaps in the correct one once mounted.
  const activeBrand = mounted ? (previewBrand ?? brand) : null;
  const mode = mounted && resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- canonical SSR "mounted" gate: this is the one deliberate render this flag exists to trigger
    setMounted(true);
  }, []);

  const theme = useMemo(() => createAppTheme(activeBrand, mode), [activeBrand, mode]);

  return (
    <ThemeBrandContext.Provider value={{ setPreviewBrand }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeBrandContext.Provider>
  );
}

export function useThemeBrandPreview() {
  const context = useContext(ThemeBrandContext);
  if (!context) {
    throw new Error("useThemeBrandPreview must be used within a ThemeBrandProvider");
  }
  return context.setPreviewBrand;
}
