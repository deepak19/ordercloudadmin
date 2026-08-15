"use client";

import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";

import {
  listAppliedPromotions,
  listEligiblePromotions,
  refreshPromotions,
} from "@/features/promotions/debug-api";

function appliedKey(orderID: string) {
  return ["promotions-debug", "applied", orderID];
}
function eligibleKey(orderID: string) {
  return ["promotions-debug", "eligible", orderID];
}

export function useOrderPromotionsDebug(orderID: string | null) {
  const [applied, eligible] = useQueries({
    queries: [
      {
        queryKey: orderID ? appliedKey(orderID) : ["promotions-debug", "applied"],
        queryFn: () => listAppliedPromotions(orderID!),
        enabled: !!orderID,
      },
      {
        queryKey: orderID ? eligibleKey(orderID) : ["promotions-debug", "eligible"],
        queryFn: () => listEligiblePromotions(orderID!),
        enabled: !!orderID,
      },
    ],
  });

  return { applied, eligible };
}

export function useRefreshPromotions(orderID: string | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => refreshPromotions(orderID!),
    onSuccess: () => {
      if (orderID) {
        queryClient.invalidateQueries({ queryKey: appliedKey(orderID) });
        queryClient.invalidateQueries({ queryKey: eligibleKey(orderID) });
      }
    },
  });
}
