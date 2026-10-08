"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Add, People } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

import { useBuyers } from "@/features/buyers/hooks";
import { buyerColumns } from "@/features/buyers/columns";
import { OcDataGrid } from "@/components/data-grid/oc-data-grid";
import { OcDataGridToolbar, ACTIVE_STATUS_FILTER } from "@/components/data-grid/oc-data-grid-toolbar";
import { PageHeader } from "@/components/page-header";

function BuyersListContent() {
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
  } = useBuyers();

  const newButton = (
    <Button variant="contained" startIcon={<Add />} component={Link} href="/buyers/new">
      New Buyer
    </Button>
  );

  return (
    <Stack spacing={2}>
      <PageHeader
        icon={People}
        title="Buyers"
        description="Manage buyer organizations and their catalog assignments."
        color="primary"
      />
      <OcDataGridToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search buyers..."
        filters={[ACTIVE_STATUS_FILTER]}
        filterValues={filters}
        onFilterChange={setFilter}
        action={newButton}
      />
      <OcDataGrid
        columns={buyerColumns}
        data={items}
        rowKey={(buyer) => buyer.ID ?? ""}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        onRetry={() => router.refresh()}
        emptyTitle="No buyers"
        emptyDescription="Create your first buyer organization to get started."
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
        onRowClick={(buyer) => router.push(`/buyers/${buyer.ID}`)}
      />
    </Stack>
  );
}

export default function BuyersPage() {
  return (
    <Suspense>
      <BuyersListContent />
    </Suspense>
  );
}
