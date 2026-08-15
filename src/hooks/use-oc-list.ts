"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ListPage } from "ordercloud-javascript-sdk";

export interface OcListParams {
  page: number;
  pageSize: number;
  search: string;
}

interface UseOcListOptions<T> {
  queryKey: unknown[];
  listFn: (params: OcListParams) => Promise<ListPage<T>>;
  pageSize?: number;
  enabled?: boolean;
}

export function useOcList<T>({
  queryKey,
  listFn,
  pageSize = 20,
  enabled = true,
}: UseOcListOptions<T>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page") ?? "1") || 1;
  const search = searchParams.get("search") ?? "";

  const query = useQuery({
    queryKey: [...queryKey, { page, pageSize, search }],
    queryFn: () => listFn({ page, pageSize, search }),
    placeholderData: keepPreviousData,
    enabled,
  });

  function updateParams(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return {
    items: query.data?.Items ?? [],
    meta: query.data?.Meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    page,
    pageSize,
    search,
    setPage: (nextPage: number) =>
      updateParams({ page: nextPage > 1 ? String(nextPage) : null }),
    setSearch: (nextSearch: string) =>
      updateParams({ search: nextSearch || null, page: null }),
  };
}
