"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Add, People } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

import { useBuyers } from "@/features/buyers/hooks";
import { buyerColumns } from "@/features/buyers/columns";
import { OcDataGrid } from "@/components/data-grid/oc-data-grid";
import { OcDataGridToolbar } from "@/components/data-grid/oc-data-grid-toolbar";
import { PageHeader } from "@/components/page-header";

function BuyersListContent() {
  const router = useRouter();
  const { items, meta, isLoading, page, search, setPage, setSearch } =
    useBuyers();

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
        action={
          <Button variant="contained" startIcon={<Add />} component={Link} href="/buyers/new">
            New Buyer
          </Button>
        }
      />
      <OcDataGrid
        columns={buyerColumns}
        data={items}
        rowKey={(buyer) => buyer.ID ?? ""}
        isLoading={isLoading}
        emptyTitle="No buyers"
        emptyDescription="Create your first buyer organization to get started."
        meta={meta}
        page={page}
        onPageChange={setPage}
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
