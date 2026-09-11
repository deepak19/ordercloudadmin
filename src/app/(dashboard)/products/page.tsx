"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Add, Inventory2 } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

import { useProducts } from "@/features/products/hooks";
import { productColumns } from "@/features/products/columns";
import { OcDataGrid } from "@/components/data-grid/oc-data-grid";
import {
  OcDataGridToolbar,
  ACTIVE_STATUS_FILTER,
  type GridFilter,
} from "@/components/data-grid/oc-data-grid-toolbar";
import { PageHeader } from "@/components/page-header";

const PARENT_FILTER: GridFilter = {
  key: "isParent",
  label: "Product type",
  options: [
    { value: "", label: "All types" },
    { value: "true", label: "Parent" },
    { value: "false", label: "Non-parent" },
  ],
  width: 170,
};

function ProductsListContent() {
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
  } = useProducts();

  const newButton = (
    <Button variant="contained" startIcon={<Add />} component={Link} href="/products/new">
      New Product
    </Button>
  );

  return (
    <Stack spacing={2}>
      <PageHeader
        icon={Inventory2}
        title="Products"
        description="Manage the products available across your catalogs."
        color="success"
      />
      <OcDataGridToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search products..."
        filters={[ACTIVE_STATUS_FILTER, PARENT_FILTER]}
        filterValues={filters}
        onFilterChange={setFilter}
        action={newButton}
      />
      <OcDataGrid
        columns={productColumns}
        data={items}
        rowKey={(product) => product.ID ?? ""}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        onRetry={() => router.refresh()}
        emptyTitle="No products"
        emptyDescription="Create your first product to get started."
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
        onRowClick={(product) => router.push(`/products/${product.ID}`)}
      />
    </Stack>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsListContent />
    </Suspense>
  );
}
