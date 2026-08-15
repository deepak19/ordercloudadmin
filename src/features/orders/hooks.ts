"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { OrderDirection } from "ordercloud-javascript-sdk";

import { useOcMutation } from "@/hooks/use-oc-mutation";
import { cancelOrder, completeOrder, getOrder, listOrders } from "@/features/orders/api";

const ORDERS_KEY = ["orders"];

export function useOrders() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const direction = (searchParams.get("direction") as OrderDirection) || "All";
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const search = searchParams.get("search") ?? "";
  const pageSize = 20;

  const query = useQuery({
    queryKey: [...ORDERS_KEY, { direction, page, pageSize, search }],
    queryFn: () => listOrders({ direction, page, pageSize, search }),
    placeholderData: keepPreviousData,
  });

  function updateParams(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return {
    items: query.data?.Items ?? [],
    meta: query.data?.Meta,
    isLoading: query.isLoading,
    direction,
    page,
    search,
    setDirection: (nextDirection: OrderDirection) =>
      updateParams({ direction: nextDirection === "All" ? null : nextDirection, page: null }),
    setPage: (nextPage: number) => updateParams({ page: nextPage > 1 ? String(nextPage) : null }),
    setSearch: (nextSearch: string) => updateParams({ search: nextSearch || null, page: null }),
  };
}

export function useOrder(direction: OrderDirection, orderID: string) {
  return useQuery({
    queryKey: [...ORDERS_KEY, direction, orderID],
    queryFn: () => getOrder({ direction, orderID }),
    enabled: !!orderID,
  });
}

export function useCancelOrder() {
  return useOcMutation({
    mutationFn: cancelOrder,
    queryKey: ORDERS_KEY,
    successMessage: "Order canceled",
  });
}

export function useCompleteOrder() {
  return useOcMutation({
    mutationFn: completeOrder,
    queryKey: ORDERS_KEY,
    successMessage: "Order completed",
  });
}
