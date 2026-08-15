"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useOcList } from "@/hooks/use-oc-list";
import { useOcMutation } from "@/hooks/use-oc-mutation";
import {
  createPromotion,
  deletePromotion,
  getPromotion,
  listPromotions,
  updatePromotion,
} from "@/features/promotions/api";

const PROMOTIONS_KEY = ["promotions"];

export function usePromotions() {
  return useOcList({ queryKey: PROMOTIONS_KEY, listFn: listPromotions });
}

export function usePromotion(promotionID: string) {
  return useQuery({
    queryKey: [...PROMOTIONS_KEY, promotionID],
    queryFn: () => getPromotion(promotionID),
    enabled: !!promotionID,
  });
}

export function useCreatePromotion() {
  const router = useRouter();
  return useOcMutation({
    mutationFn: createPromotion,
    queryKey: PROMOTIONS_KEY,
    successMessage: "Promotion created",
    onSuccess: (promotion) => router.push(`/promotions/${promotion.ID}`),
  });
}

export function useUpdatePromotion() {
  return useOcMutation({
    mutationFn: updatePromotion,
    queryKey: PROMOTIONS_KEY,
    successMessage: "Promotion saved",
  });
}

export function useDeletePromotion() {
  const router = useRouter();
  return useOcMutation({
    mutationFn: deletePromotion,
    queryKey: PROMOTIONS_KEY,
    successMessage: "Promotion deleted",
    onSuccess: () => router.push("/promotions"),
  });
}
