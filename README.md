# OrderCloud Admin

A generic, multi-brand admin dashboard for [OrderCloud](https://ordercloud.io), built on Next.js (App Router) + MUI. The app is **brand-agnostic** — any project can reuse this repo and define its own brands entirely through configuration, with no code changes.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll land on the sign-in screen; enter OrderCloud admin credentials for the selected brand.

## Multi-brand configuration

Brands are defined in a **single environment variable**, `NEXT_PUBLIC_OC_BRANDS`, as a JSON array. The login screen renders a brand picker over these entries (auto-hidden when only one brand is configured), and the selected brand drives both:

- **OrderCloud authentication** — `apiUrl`, `clientID`, `marketplaceID`, `scope`
- **App theme** — the brand's primary color, in light and dark mode

The **first brand in the array is the default** selection.

### Steps to configure brands for a new project

1. **Create `.env.local`** (or edit `.env`) in the project root.

2. **Set `NEXT_PUBLIC_OC_BRANDS`** to a JSON array of brand objects, on a single line. Example with two brands:

   ```bash
   NEXT_PUBLIC_OC_BRANDS='[{"id":"acme","name":"Acme","apiUrl":"https://useast-sandbox.ordercloud.io","clientID":"YOUR_ACME_CLIENT_ID","marketplaceID":"YOUR_ACME_MARKETPLACE_ID","scope":"FullAccess","primary":"hsl(160,45%,38%)"},{"id":"brand-two","name":"Brand Two","apiUrl":"https://useast-sandbox.ordercloud.io","clientID":"YOUR_BRAND_TWO_CLIENT_ID","marketplaceID":"YOUR_BRAND_TWO_MARKETPLACE_ID","scope":"FullAccess","primary":"#2563eb"}]'
   ```

3. **Restart the dev server** — environment variables are inlined at build time, so a restart is required after any change (`Ctrl+C`, then `npm run dev`).

That's it. The picker updates automatically, each brand themes the app on selection, and login authenticates against that brand's OrderCloud marketplace.

### Brand object reference

| Field | Required | Description |
|-------|----------|-------------|
| `name` | ✅ | Display name shown in the picker. |
| `id` | — | Stable identifier. Defaults to a slug of `name` (e.g. `"Brand Two"` → `brand-two`). |
| `apiUrl` | — | OrderCloud API base URL (e.g. `https://useast-sandbox.ordercloud.io` or the production URL). |
| `clientID` | — | OrderCloud API client ID for the brand's marketplace. Required to actually sign in. |
| `marketplaceID` | — | OrderCloud marketplace ID. |
| `scope` | — | OrderCloud roles. Accepts a comma-delimited string (`"FullAccess"`) or an array (`["ProductAdmin","OrderAdmin"]`). Defaults to `FullAccess`. |
| `primary` | — | Shorthand: a single color (hex/HSL) used as the primary in both light and dark mode. |
| `theme` | — | Full control: `{ "light": { "primary", "primaryForeground" }, "dark": { ... } }`. Any missing color falls back to a neutral default. |

`primary` and `theme` can be combined — `theme` wins where both specify a value.

### Theming examples

Single color for both modes:

```json
{ "id": "acme", "name": "Acme", "primary": "#16a34a" }
```

Separate light/dark colors and a custom foreground:

```json
{
  "id": "acme",
  "name": "Acme",
  "theme": {
    "light": { "primary": "hsl(160,45%,38%)", "primaryForeground": "#ffffff" },
    "dark":  { "primary": "hsl(160,40%,50%)", "primaryForeground": "#0b0d12" }
  }
}
```

### Single-brand setup

Provide an array with one object. The brand picker is automatically hidden and the login copy adjusts accordingly:

```bash
NEXT_PUBLIC_OC_BRANDS='[{"id":"acme","name":"Acme","apiUrl":"https://useast-sandbox.ordercloud.io","clientID":"...","marketplaceID":"...","scope":"FullAccess","primary":"hsl(160,45%,38%)"}]'
```

### Fallback behavior

Resolution order (so no deployment breaks):

1. `NEXT_PUBLIC_OC_BRANDS` if present and valid JSON.
2. Otherwise, a legacy single-brand config from `NEXT_PUBLIC_ACME_OC_*` variables (`_API_URL`, `_CLIENT_ID`, `_MARKETPLACE_ID`, `_SCOPE`).
3. Otherwise, a built-in default brand so the app always renders.

If `NEXT_PUBLIC_OC_BRANDS` contains invalid JSON, the app logs a warning and falls back to the legacy config.

### Where the config is consumed

- [`src/config/brands.ts`](src/config/brands.ts) — parses/normalizes `NEXT_PUBLIC_OC_BRANDS` into the `Brand[]` used across the app.
- [`src/app/(auth)/login/page.tsx`](src/app/(auth)/login/page.tsx) — renders the brand picker.
- [`src/lib/ordercloud/brand-config.ts`](src/lib/ordercloud/brand-config.ts) — applies the selected brand to the OrderCloud SDK.
- [`src/config/theme.ts`](src/config/theme.ts) — builds the MUI theme from the brand palette.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server. |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |
