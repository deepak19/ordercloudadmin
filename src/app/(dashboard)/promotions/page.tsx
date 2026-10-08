"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Add, LocalOffer } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

import { usePromotions } from "@/features/promotions/hooks";
import { promotionColumns } from "@/features/promotions/columns";
import { OcDataGrid } from "@/components/data-grid/oc-data-grid";
import { OcDataGridToolbar, ACTIVE_STATUS_FILTER } from "@/components/data-grid/oc-data-grid-toolbar";
import { PageHeader } from "@/components/page-header";

function PromotionsListContent() {
  const router = useRouter();
  const {
    items,
    meta,
    isLoading,
    isFetching,
    error,
    page,
    pageSize,
    search,
    sortBy,
    filters,
    setPage,
    setPageSize,
    setSearch,
    setSortBy,
    setFilter,
  } = usePromotions();

  const newButton = (
    <Button variant="contained" startIcon={<Add />} component={Link} href="/promotions/new">
      New Promotion
    </Button>
  );

  return (
    <Stack spacing={2}>
      <PageHeader
        icon={LocalOffer}
        title="Promotions"
        description="Create and manage discount codes and automatic promotions."
        color="secondary"
      />
      <OcDataGridToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search promotions..."
        filters={[ACTIVE_STATUS_FILTER]}
        filterValues={filters}
        onFilterChange={setFilter}
        action={newButton}
      />
      <OcDataGrid
        columns={promotionColumns}
        data={items}
        rowKey={(promotion) => promotion.ID ?? ""}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        onRetry={() => router.refresh()}
        emptyTitle="No promotions"
        emptyDescription="Create your first promotion to get started."
        emptyAction={newButton}
        search={search}
        onClearSearch={() => setSearch("")}
        meta={meta}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onRowClick={(promotion) => router.push(`/promotions/${promotion.ID}`)}
      />
    </Stack>
  );
}

export default function PromotionsPage() {
  return (
    <Suspense>
      <PromotionsListContent />
    </Suspense>
  );
}
