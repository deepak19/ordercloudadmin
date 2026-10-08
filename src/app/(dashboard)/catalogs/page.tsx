"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Add, MenuBook } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

import { useCatalogs } from "@/features/catalogs/hooks";
import { catalogColumns } from "@/features/catalogs/columns";
import { OcDataGrid } from "@/components/data-grid/oc-data-grid";
import { OcDataGridToolbar, ACTIVE_STATUS_FILTER } from "@/components/data-grid/oc-data-grid-toolbar";
import { PageHeader } from "@/components/page-header";

function CatalogsListContent() {
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
  } = useCatalogs();

  const newButton = (
    <Button variant="contained" startIcon={<Add />} component={Link} href="/catalogs/new">
      New Catalog
    </Button>
  );

  return (
    <Stack spacing={2}>
      <PageHeader
        icon={MenuBook}
        title="Catalogs"
        description="Organize products into catalogs and categories for your buyers."
        color="info"
      />
      <OcDataGridToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search catalogs..."
        filters={[ACTIVE_STATUS_FILTER]}
        filterValues={filters}
        onFilterChange={setFilter}
        action={newButton}
      />
      <OcDataGrid
        columns={catalogColumns}
        data={items}
        rowKey={(catalog) => catalog.ID ?? ""}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        onRetry={() => router.refresh()}
        emptyTitle="No catalogs"
        emptyDescription="Create your first catalog to get started."
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
        onRowClick={(catalog) => router.push(`/catalogs/${catalog.ID}`)}
      />
    </Stack>
  );
}

export default function CatalogsPage() {
  return (
    <Suspense>
      <CatalogsListContent />
    </Suspense>
  );
}
