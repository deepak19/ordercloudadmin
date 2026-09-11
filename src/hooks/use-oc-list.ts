"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ListPage } from "ordercloud-javascript-sdk";

import { writeListQuery } from "@/lib/list-return";

export interface OcListParams {
  page: number;
  pageSize: number;
  search: string;
  sortBy?: string;
  /** Arbitrary filter values keyed by URL param name (e.g. { status: "true" }). */
  filters: Record<string, string>;
}

interface UseOcListOptions<T> {
  queryKey: unknown[];
  listFn: (params: OcListParams) => Promise<ListPage<T>>;
  pageSize?: number;
  enabled?: boolean;
  /** URL param names this list reads as filters (e.g. ["status"]). */
  filterKeys?: string[];
}

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export function useOcList<T>({
  queryKey,
  listFn,
  pageSize: defaultPageSize = 20,
  enabled = true,
  filterKeys = [],
}: UseOcListOptions<T>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page") ?? "1") || 1;
  const pageSize = Number(searchParams.get("pageSize") ?? "") || defaultPageSize;
  const search = searchParams.get("search") ?? "";
  const sortBy = searchParams.get("sortBy") ?? "";

  const filters: Record<string, string> = {};
  for (const key of filterKeys) {
    const value = searchParams.get(key);
    if (value) filters[key] = value;
  }
  // Stable primitive for query key / deps (hooks can't depend on a fresh object).
  const filtersKey = JSON.stringify(filters);

  // Remember this list's query so detail pages can return to the same view.
  const queryString = searchParams.toString();
  useEffect(() => {
    writeListQuery(pathname, queryString);
  }, [pathname, queryString]);

  const query = useQuery({
    queryKey: [...queryKey, { page, pageSize, search, sortBy, filtersKey }],
    queryFn: () =>
      listFn({ page, pageSize, search, sortBy: sortBy || undefined, filters }),
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
    sortBy,
    filters,
    setFilter: (key: string, value: string) =>
      updateParams({ [key]: value || null, page: null }),
    setPage: (nextPage: number) =>
      updateParams({ page: nextPage > 1 ? String(nextPage) : null }),
    setPageSize: (nextPageSize: number) =>
      updateParams({
        pageSize: nextPageSize !== defaultPageSize ? String(nextPageSize) : null,
        page: null,
      }),
    setSearch: (nextSearch: string) =>
      updateParams({ search: nextSearch || null, page: null }),
    setSortBy: (nextSortBy: string) =>
      updateParams({ sortBy: nextSortBy || null, page: null }),
  };
}
