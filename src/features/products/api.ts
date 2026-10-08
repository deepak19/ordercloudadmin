import { Products, type Product } from "ordercloud-javascript-sdk";

import type { OcListParams } from "@/hooks/use-oc-list";
import type { ProductFormValues } from "@/features/products/schema";

export function listProducts({ page, pageSize, search, sortBy, filters }: OcListParams) {
  const ocFilters = {
    ...statusFilter(filters.status),
    ...boolFilter("IsParent", filters.isParent),
  };
  return Products.List<Product>({
    page,
    pageSize,
    search,
    sortBy: sortBy ? [sortBy as never] : undefined,
    filters: Object.keys(ocFilters).length ? ocFilters : undefined,
  });
}

/** Maps the generic "status" filter value ("true"/"false") to an OrderCloud Active filter. */
export function statusFilter(status: string | undefined) {
  if (status === "true") return { Active: true };
  if (status === "false") return { Active: false };
  return undefined;
}

/** Maps a "true"/"false" filter value to an OrderCloud boolean filter on `field`. */
function boolFilter(field: string, value: string | undefined) {
  if (value === "true") return { [field]: true };
  if (value === "false") return { [field]: false };
  return undefined;
}

export function getProduct(productID: string) {
  return Products.Get<Product>(productID);
}

export function createProduct(values: ProductFormValues) {
  const { ID, ...rest } = values;
  return Products.Create<Product>({ ID: ID || undefined, ...rest });
}

export function updateProduct({
  productID,
  values,
}: {
  productID: string;
  values: ProductFormValues;
}) {
  return Products.Save<Product>(productID, values);
}

export function deleteProduct(productID: string) {
  return Products.Delete(productID);
}
