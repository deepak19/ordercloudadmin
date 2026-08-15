"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useOcList } from "@/hooks/use-oc-list";
import { useOcMutation } from "@/hooks/use-oc-mutation";
import {
  createBuyer,
  deleteBuyer,
  getBuyer,
  listBuyers,
  updateBuyer,
} from "@/features/buyers/api";

const BUYERS_KEY = ["buyers"];

export function useBuyers() {
  return useOcList({ queryKey: BUYERS_KEY, listFn: listBuyers });
}

export function useBuyer(buyerID: string) {
  return useQuery({
    queryKey: [...BUYERS_KEY, buyerID],
    queryFn: () => getBuyer(buyerID),
    enabled: !!buyerID,
  });
}

export function useCreateBuyer() {
  const router = useRouter();
  return useOcMutation({
    mutationFn: createBuyer,
    queryKey: BUYERS_KEY,
    successMessage: "Buyer created",
    onSuccess: (buyer) => router.push(`/buyers/${buyer.ID}`),
  });
}

export function useUpdateBuyer() {
  return useOcMutation({
    mutationFn: updateBuyer,
    queryKey: BUYERS_KEY,
    successMessage: "Buyer saved",
  });
}

export function useDeleteBuyer() {
  const router = useRouter();
  return useOcMutation({
    mutationFn: deleteBuyer,
    queryKey: BUYERS_KEY,
    successMessage: "Buyer deleted",
    onSuccess: () => router.push("/buyers"),
  });
}
