import { Catalogs, type Catalog } from "ordercloud-javascript-sdk";

import type { OcListParams } from "@/hooks/use-oc-list";
import type { CatalogFormValues } from "@/features/catalogs/schema";

export function listCatalogs({ page, pageSize, search, sortBy, filters }: OcListParams) {
  return Catalogs.List<Catalog>({
    page,
    pageSize,
    search,
    sortBy: sortBy ? [sortBy as never] : undefined,
    filters: statusFilter(filters.status),
  });
}

/** Maps the generic "status" filter value ("true"/"false") to an OrderCloud Active filter. */
export function statusFilter(status: string | undefined) {
  if (status === "true") return { Active: true };
  if (status === "false") return { Active: false };
  return undefined;
}

export function getCatalog(catalogID: string) {
  return Catalogs.Get<Catalog>(catalogID);
}

export function createCatalog(values: CatalogFormValues) {
  const { ID, ...rest } = values;
  return Catalogs.Create<Catalog>({ ID: ID || undefined, ...rest });
}

export function updateCatalog({
  catalogID,
  values,
}: {
  catalogID: string;
  values: CatalogFormValues;
}) {
  return Catalogs.Save<Catalog>(catalogID, values);
}

export function deleteCatalog(catalogID: string) {
  return Catalogs.Delete(catalogID);
}
