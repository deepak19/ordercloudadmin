"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Add, LocalOffer } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

import { usePromotions } from "@/features/promotions/hooks";
import { promotionColumns } from "@/features/promotions/columns";
import { OcDataGrid } from "@/components/data-grid/oc-data-grid";
import { OcDataGridToolbar } from "@/components/data-grid/oc-data-grid-toolbar";
import { PageHeader } from "@/components/page-header";

function PromotionsListContent() {
  const router = useRouter();
  const { items, meta, isLoading, page, search, setPage, setSearch } =
    usePromotions();

  return (
    <Stack spacing={2}>
      <PageHeader
        icon={LocalOffer}
        title="Promotions"
        description="Create and manage discount codes and automatic promotions."
        color="error"
      />
      <OcDataGridToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search promotions..."
        action={
          <Button variant="contained" startIcon={<Add />} component={Link} href="/promotions/new">
            New Promotion
          </Button>
        }
      />
      <OcDataGrid
        columns={promotionColumns}
        data={items}
        rowKey={(promotion) => promotion.ID ?? ""}
        isLoading={isLoading}
        emptyTitle="No promotions"
        emptyDescription="Create your first promotion to get started."
        meta={meta}
        page={page}
        onPageChange={setPage}
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
