import { Products, type Product } from "ordercloud-javascript-sdk";

import type { OcListParams } from "@/hooks/use-oc-list";
import type { ProductFormValues } from "@/features/products/schema";

export function listProducts({ page, pageSize, search }: OcListParams) {
  return Products.List<Product>({ page, pageSize, search });
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
