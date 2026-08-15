import { Configuration } from "ordercloud-javascript-sdk";

import type { Brand } from "@/config/brands";

export function applyBrandConfig(brand: Brand) {
  Configuration.Set({
    ...(brand.apiUrl && { baseApiUrl: brand.apiUrl }),
    ...(brand.clientID && { clientID: brand.clientID }),
  });
}
