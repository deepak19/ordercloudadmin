"use client";

import { useQuery } from "@tanstack/react-query";

import { useOcMutation } from "@/hooks/use-oc-mutation";
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from "@/features/categories/api";

function categoriesKey(catalogID: string) {
  return ["categories", catalogID];
}

export function useCategories(catalogID: string) {
  const query = useQuery({
    queryKey: categoriesKey(catalogID),
    queryFn: () => listCategories(catalogID),
    enabled: !!catalogID,
  });

  return {
    items: query.data?.Items ?? [],
    isLoading: query.isLoading,
  };
}

export function useCreateCategory(catalogID: string) {
  return useOcMutation({
    mutationFn: createCategory,
    queryKey: categoriesKey(catalogID),
    successMessage: "Category created",
  });
}

export function useUpdateCategory(catalogID: string) {
  return useOcMutation({
    mutationFn: updateCategory,
    queryKey: categoriesKey(catalogID),
    successMessage: "Category saved",
  });
}

export function useDeleteCategory(catalogID: string) {
  return useOcMutation({
    mutationFn: deleteCategory,
    queryKey: categoriesKey(catalogID),
    successMessage: "Category deleted",
  });
}
