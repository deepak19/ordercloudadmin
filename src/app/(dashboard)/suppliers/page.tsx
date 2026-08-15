"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Add, Business } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

import { useSuppliers } from "@/features/suppliers/hooks";
import { supplierColumns } from "@/features/suppliers/columns";
import { OcDataGrid } from "@/components/data-grid/oc-data-grid";
import { OcDataGridToolbar } from "@/components/data-grid/oc-data-grid-toolbar";
import { PageHeader } from "@/components/page-header";

function SuppliersListContent() {
  const router = useRouter();
  const { items, meta, isLoading, page, search, setPage, setSearch } =
    useSuppliers();

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
        action={
          <Button variant="contained" startIcon={<Add />} component={Link} href="/suppliers/new">
            New Supplier
          </Button>
        }
      />
      <OcDataGrid
        columns={supplierColumns}
        data={items}
        rowKey={(supplier) => supplier.ID ?? ""}
        isLoading={isLoading}
        emptyTitle="No suppliers"
        emptyDescription="Create your first supplier to get started."
        meta={meta}
        page={page}
        onPageChange={setPage}
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
