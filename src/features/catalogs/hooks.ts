"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useOcList } from "@/hooks/use-oc-list";
import { useOcMutation } from "@/hooks/use-oc-mutation";
import {
  createCatalog,
  deleteCatalog,
  getCatalog,
  listCatalogs,
  updateCatalog,
} from "@/features/catalogs/api";

const CATALOGS_KEY = ["catalogs"];

export function useCatalogs() {
  return useOcList({ queryKey: CATALOGS_KEY, listFn: listCatalogs });
}

export function useCatalog(catalogID: string) {
  return useQuery({
    queryKey: [...CATALOGS_KEY, catalogID],
    queryFn: () => getCatalog(catalogID),
    enabled: !!catalogID,
  });
}

export function useCreateCatalog() {
  const router = useRouter();
  return useOcMutation({
    mutationFn: createCatalog,
    queryKey: CATALOGS_KEY,
    successMessage: "Catalog created",
    onSuccess: (catalog) => router.push(`/catalogs/${catalog.ID}`),
  });
}

export function useUpdateCatalog() {
  return useOcMutation({
    mutationFn: updateCatalog,
    queryKey: CATALOGS_KEY,
    successMessage: "Catalog saved",
  });
}

export function useDeleteCatalog() {
  const router = useRouter();
  return useOcMutation({
    mutationFn: deleteCatalog,
    queryKey: CATALOGS_KEY,
    successMessage: "Catalog deleted",
    onSuccess: () => router.push("/catalogs"),
  });
}
