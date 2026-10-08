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

/**
 * Multi-brand configuration is fully data-driven: brands are read from a single
 * JSON env var so a project can add, remove, or re-theme brands without code
 * changes. The login screen renders a picker over these brands (hidden when
 * there is only one) and the selected brand drives both OrderCloud auth
 * (apiUrl / clientID / marketplaceID / scope) and the app theme.
 *
 *   NEXT_PUBLIC_OC_BRANDS='[
 *     { "id": "psp", "name": "PSP", "apiUrl": "https://useast-sandbox.ordercloud.io",
 *       "clientID": "...", "marketplaceID": "...", "scope": "FullAccess",
 *       "primary": "#2563eb" },
 *     { "id": "wagnwash", "name": "WagnWash", "apiUrl": "https://useast-sandbox.ordercloud.io",
 *       "clientID": "...", "marketplaceID": "...", "scope": ["FullAccess"],
 *       "theme": { "light": { "primary": "#d946ef" }, "dark": { "primary": "#e879f9" } } }
 *   ]'
 *
 * Per brand, only `name` is strictly required; everything else has a sensible
 * default. `scope` accepts a comma-delimited string or an array. Theme can be
 * given as a single `primary` (used for both modes) or a full light/dark object;
 * any missing color falls back to the neutral default below.
 */

const DEFAULT_THEME: Brand["theme"] = {
  light: { primary: "hsl(215, 20%, 35%)", primaryForeground: "#ffffff" },
  dark: { primary: "hsl(215, 25%, 65%)", primaryForeground: "#0b0d12" },
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseScope(value: unknown): string[] {
  const raw = Array.isArray(value)
    ? value.map(String)
    : typeof value === "string"
      ? value.split(",")
      : ["FullAccess"];
  const scope = raw.map((role) => role.trim()).filter(Boolean);
  return scope.length ? scope : ["FullAccess"];
}

type RawPalette = Partial<BrandPalette>;
interface RawBrand {
  id?: string;
  name?: string;
  apiUrl?: string;
  clientID?: string;
  marketplaceID?: string;
  scope?: string | string[];
  primary?: string;
  primaryForeground?: string;
  theme?: { light?: RawPalette; dark?: RawPalette };
}

function normalizePalette(mode: "light" | "dark", raw: RawBrand): BrandPalette {
  const fromTheme = raw.theme?.[mode] ?? {};
  return {
    primary: fromTheme.primary ?? raw.primary ?? DEFAULT_THEME[mode].primary,
    primaryForeground:
      fromTheme.primaryForeground ?? raw.primaryForeground ?? DEFAULT_THEME[mode].primaryForeground,
  };
}

function normalizeBrand(raw: RawBrand): Brand | null {
  const name = raw.name?.trim();
  if (!name) return null;
  const id = raw.id?.trim() || slugify(name);
  if (!id) return null;

  return {
    id,
    name,
    apiUrl: raw.apiUrl?.trim() || undefined,
    clientID: raw.clientID?.trim() || undefined,
    marketplaceID: raw.marketplaceID?.trim() || undefined,
    scope: parseScope(raw.scope),
    theme: {
      light: normalizePalette("light", raw),
      dark: normalizePalette("dark", raw),
    },
  };
}

function parseBrandsEnv(value: string | undefined): Brand[] {
  if (!value?.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    const list: RawBrand[] = Array.isArray(parsed) ? parsed : [parsed];
    const brands = list
      .map(normalizeBrand)
      .filter((brand): brand is Brand => brand !== null);
    // De-duplicate by id (first wins).
    const seen = new Set<string>();
    return brands.filter((brand) => (seen.has(brand.id) ? false : (seen.add(brand.id), true)));
  } catch (error) {
    console.error("Invalid NEXT_PUBLIC_OC_BRANDS JSON — falling back to legacy config.", error);
    return [];
  }
}

// Backward-compatible fallback: the original single-brand env layout. Used only
// when NEXT_PUBLIC_OC_BRANDS is absent, so existing deployments keep working.
function legacyBrands(): Brand[] {
  const legacy = normalizeBrand({
    id: "acme",
    name: "Acme",
    apiUrl: process.env.NEXT_PUBLIC_ACME_OC_API_URL,
    clientID: process.env.NEXT_PUBLIC_ACME_OC_CLIENT_ID,
    marketplaceID: process.env.NEXT_PUBLIC_ACME_OC_MARKETPLACE_ID,
    scope: process.env.NEXT_PUBLIC_ACME_OC_SCOPE,
    theme: {
      light: { primary: "hsl(160, 45%, 38%)", primaryForeground: "#ffffff" },
      dark: { primary: "hsl(160, 40%, 50%)", primaryForeground: "#ffffff" },
    },
  });
  return legacy ? [legacy] : [];
}

// A guaranteed non-empty default so the app never renders with zero brands.
const FALLBACK_BRAND: Brand = {
  id: "default",
  name: "OrderCloud",
  scope: ["FullAccess"],
  theme: DEFAULT_THEME,
};

const configuredBrands = parseBrandsEnv(process.env.NEXT_PUBLIC_OC_BRANDS);

export const BRANDS: Brand[] = configuredBrands.length
  ? configuredBrands
  : legacyBrands().length
    ? legacyBrands()
    : [FALLBACK_BRAND];

export const DEFAULT_BRAND_ID = BRANDS[0].id;

export function getBrand(id: string): Brand | undefined {
  return BRANDS.find((brand) => brand.id === id);
}
