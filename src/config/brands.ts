export interface BrandPalette {
  primary: string;
  primaryForeground: string;
}

export interface Brand {
  id: string;
  name: string;
  apiUrl?: string;
  clientID?: string;
  marketplaceID?: string;
  scope: string[];
  theme: {
    light: BrandPalette;
    dark: BrandPalette;
  };
}

function parseScope(value: string | undefined): string[] {
  return (value ?? "FullAccess")
    .split(",")
    .map((role) => role.trim())
    .filter(Boolean);
}

// To add a brand: add an entry below, then define its NEXT_PUBLIC_<BRAND>_OC_*
// env vars in .env.local. Env var names must be written out literally here
// (not built dynamically) so Next.js can inline them at build time.
export const BRANDS: Brand[] = [
  {
    id: "acme",
    name: "Acme",
    apiUrl: process.env.NEXT_PUBLIC_ACME_OC_API_URL,
    clientID: process.env.NEXT_PUBLIC_ACME_OC_CLIENT_ID,
    marketplaceID: process.env.NEXT_PUBLIC_ACME_OC_MARKETPLACE_ID,
    scope: parseScope(process.env.NEXT_PUBLIC_ACME_OC_SCOPE),
    theme: {
      light: {
        primary: "hsl(160, 45%, 38%)",
        primaryForeground: "#ffffff",
      },
      dark: {
        primary: "hsl(160, 40%, 50%)",
        primaryForeground: "#ffffff",
      },
    },
  },
];

export const DEFAULT_BRAND_ID = BRANDS[0].id;

export function getBrand(id: string): Brand | undefined {
  return BRANDS.find((brand) => brand.id === id);
}
