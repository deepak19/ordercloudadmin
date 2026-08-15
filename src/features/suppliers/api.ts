import { Suppliers, type Supplier } from "ordercloud-javascript-sdk";

import type { OcListParams } from "@/hooks/use-oc-list";
import type { SupplierFormValues } from "@/features/suppliers/schema";

export function listSuppliers({ page, pageSize, search }: OcListParams) {
  return Suppliers.List<Supplier>({ page, pageSize, search });
}

export function getSupplier(supplierID: string) {
  return Suppliers.Get<Supplier>(supplierID);
}

export function createSupplier(values: SupplierFormValues) {
  const { ID, ...rest } = values;
  return Suppliers.Create<Supplier>({ ID: ID || undefined, ...rest });
}

export function updateSupplier({
  supplierID,
  values,
}: {
  supplierID: string;
  values: SupplierFormValues;
}) {
  return Suppliers.Save<Supplier>(supplierID, values);
}

export function deleteSupplier(supplierID: string) {
  return Suppliers.Delete(supplierID);
}
