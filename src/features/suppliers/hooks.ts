"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useOcList } from "@/hooks/use-oc-list";
import { useOcMutation } from "@/hooks/use-oc-mutation";
import {
  createSupplier,
  deleteSupplier,
  getSupplier,
  listSuppliers,
  updateSupplier,
} from "@/features/suppliers/api";

const SUPPLIERS_KEY = ["suppliers"];

export function useSuppliers() {
  return useOcList({ queryKey: SUPPLIERS_KEY, listFn: listSuppliers });
}

export function useSupplier(supplierID: string) {
  return useQuery({
    queryKey: [...SUPPLIERS_KEY, supplierID],
    queryFn: () => getSupplier(supplierID),
    enabled: !!supplierID,
  });
}

export function useCreateSupplier() {
  const router = useRouter();
  return useOcMutation({
    mutationFn: createSupplier,
    queryKey: SUPPLIERS_KEY,
    successMessage: "Supplier created",
    onSuccess: (supplier) => router.push(`/suppliers/${supplier.ID}`),
  });
}

export function useUpdateSupplier() {
  return useOcMutation({
    mutationFn: updateSupplier,
    queryKey: SUPPLIERS_KEY,
    successMessage: "Supplier saved",
  });
}

export function useDeleteSupplier() {
  const router = useRouter();
  return useOcMutation({
    mutationFn: deleteSupplier,
    queryKey: SUPPLIERS_KEY,
    successMessage: "Supplier deleted",
    onSuccess: () => router.push("/suppliers"),
  });
}
