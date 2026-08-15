"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Add, MenuBook } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

import { useCatalogs } from "@/features/catalogs/hooks";
import { catalogColumns } from "@/features/catalogs/columns";
import { OcDataGrid } from "@/components/data-grid/oc-data-grid";
import { OcDataGridToolbar } from "@/components/data-grid/oc-data-grid-toolbar";
import { PageHeader } from "@/components/page-header";

function CatalogsListContent() {
  const router = useRouter();
  const { items, meta, isLoading, page, search, setPage, setSearch } =
    useCatalogs();

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
        action={
          <Button variant="contained" startIcon={<Add />} component={Link} href="/catalogs/new">
            New Catalog
          </Button>
        }
      />
      <OcDataGrid
        columns={catalogColumns}
        data={items}
        rowKey={(catalog) => catalog.ID ?? ""}
        isLoading={isLoading}
        emptyTitle="No catalogs"
        emptyDescription="Create your first catalog to get started."
        meta={meta}
        page={page}
        onPageChange={setPage}
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
