"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useOcList } from "@/hooks/use-oc-list";
import { useOcMutation } from "@/hooks/use-oc-mutation";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "@/features/products/api";

const PRODUCTS_KEY = ["products"];

export function useProducts() {
  return useOcList({ queryKey: PRODUCTS_KEY, listFn: listProducts });
}

export function useProduct(productID: string) {
  return useQuery({
    queryKey: [...PRODUCTS_KEY, productID],
    queryFn: () => getProduct(productID),
    enabled: !!productID,
  });
}

export function useCreateProduct() {
  const router = useRouter();
  return useOcMutation({
    mutationFn: createProduct,
    queryKey: PRODUCTS_KEY,
    successMessage: "Product created",
    onSuccess: (product) => router.push(`/products/${product.ID}`),
  });
}

export function useUpdateProduct() {
  return useOcMutation({
    mutationFn: updateProduct,
    queryKey: PRODUCTS_KEY,
    successMessage: "Product saved",
  });
}

export function useDeleteProduct() {
  const router = useRouter();
  return useOcMutation({
    mutationFn: deleteProduct,
    queryKey: PRODUCTS_KEY,
    successMessage: "Product deleted",
    onSuccess: () => router.push("/products"),
  });
}

