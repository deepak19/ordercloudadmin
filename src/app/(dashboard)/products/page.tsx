"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Add, Inventory2 } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

import { useProducts } from "@/features/products/hooks";
import { productColumns } from "@/features/products/columns";
import { OcDataGrid } from "@/components/data-grid/oc-data-grid";
import { OcDataGridToolbar } from "@/components/data-grid/oc-data-grid-toolbar";
import { PageHeader } from "@/components/page-header";

function ProductsListContent() {
  const router = useRouter();
  const { items, meta, isLoading, page, search, setPage, setSearch } =
    useProducts();

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
        action={
          <Button variant="contained" startIcon={<Add />} component={Link} href="/products/new">
            New Product
          </Button>
        }
      />
      <OcDataGrid
        columns={productColumns}
        data={items}
        rowKey={(product) => product.ID ?? ""}
        isLoading={isLoading}
        emptyTitle="No products"
        emptyDescription="Create your first product to get started."
        meta={meta}
        page={page}
        onPageChange={setPage}
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
