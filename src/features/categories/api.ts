import { Categories, type Category } from "ordercloud-javascript-sdk";

import type { CategoryFormValues } from "@/features/categories/schema";

export function listCategories(catalogID: string) {
  return Categories.List<Category>(catalogID, { pageSize: 100 });
}

export function createCategory({
  catalogID,
  values,
}: {
  catalogID: string;
  values: CategoryFormValues;
}) {
  const { ID, ...rest } = values;
  return Categories.Create<Category>(catalogID, { ID: ID || undefined, ...rest });
}

export function updateCategory({
  catalogID,
  categoryID,
  values,
}: {
  catalogID: string;
  categoryID: string;
  values: CategoryFormValues;
}) {
  return Categories.Save<Category>(catalogID, categoryID, values);
}

export function deleteCategory({
  catalogID,
  categoryID,
}: {
  catalogID: string;
  categoryID: string;
}) {
  return Categories.Delete(catalogID, categoryID);
}
