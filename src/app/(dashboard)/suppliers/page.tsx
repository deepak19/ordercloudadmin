"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Add, Business } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

import { useSuppliers } from "@/features/suppliers/hooks";
import { supplierColumns } from "@/features/suppliers/columns";
import { OcDataGrid } from "@/components/data-grid/oc-data-grid";
import { OcDataGridToolbar, ACTIVE_STATUS_FILTER } from "@/components/data-grid/oc-data-grid-toolbar";
import { PageHeader } from "@/components/page-header";

function SuppliersListContent() {
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
  } = useSuppliers();

  const newButton = (
    <Button variant="contained" startIcon={<Add />} component={Link} href="/suppliers/new">
      New Supplier
    </Button>
  );

  return (
    <Stack spacing={2}>
      <PageHeader
        icon={Business}
        title="Suppliers"
        description="Manage supplier organizations selling in your marketplace."
        color="secondary"
      />
      <OcDataGridToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search suppliers..."
        filters={[ACTIVE_STATUS_FILTER]}
        filterValues={filters}
        onFilterChange={setFilter}
        action={newButton}
      />
      <OcDataGrid
        columns={supplierColumns}
        data={items}
        rowKey={(supplier) => supplier.ID ?? ""}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        onRetry={() => router.refresh()}
        emptyTitle="No suppliers"
        emptyDescription="Create your first supplier to get started."
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
        onRowClick={(supplier) => router.push(`/suppliers/${supplier.ID}`)}
      />
    </Stack>
  );
}

export default function SuppliersPage() {
  return (
    <Suspense>
      <SuppliersListContent />
    </Suspense>
  );
}
