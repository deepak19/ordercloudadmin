"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Stack } from "@mui/material";
import { AssignmentReturn } from "@mui/icons-material";

import { useReturns } from "@/features/returns/hooks";
import { returnColumns } from "@/features/returns/columns";
import { OcDataGrid } from "@/components/data-grid/oc-data-grid";
import { OcDataGridToolbar } from "@/components/data-grid/oc-data-grid-toolbar";
import { PageHeader } from "@/components/page-header";

function ReturnsListContent() {
  const router = useRouter();
  const { items, meta, isLoading, page, search, setPage, setSearch } =
    useReturns();

  return (
    <Stack spacing={2}>
      <PageHeader
        icon={AssignmentReturn}
        title="Returns"
        description="Review and process order return requests."
        color="secondary"
      />
      <OcDataGridToolbar search={search} onSearchChange={setSearch} placeholder="Search returns..." />
      <OcDataGrid
        columns={returnColumns}
        data={items}
        rowKey={(orderReturn) => orderReturn.ID ?? ""}
        isLoading={isLoading}
        emptyTitle="No returns"
        emptyDescription="Order returns will show up here once requested."
        meta={meta}
        page={page}
        onPageChange={setPage}
        onRowClick={(orderReturn) => router.push(`/returns/${orderReturn.ID}`)}
      />
    </Stack>
  );
}

export default function ReturnsPage() {
  return (
    <Suspense>
      <ReturnsListContent />
    </Suspense>
  );
}
