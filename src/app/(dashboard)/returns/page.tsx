"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Stack } from "@mui/material";
import { AssignmentReturn } from "@mui/icons-material";

import { useReturns } from "@/features/returns/hooks";
import { returnColumns } from "@/features/returns/columns";
import { OcDataGrid } from "@/components/data-grid/oc-data-grid";
import { OcDataGridToolbar, type GridFilter } from "@/components/data-grid/oc-data-grid-toolbar";
import { PageHeader } from "@/components/page-header";

const RETURN_STATUS_FILTER: GridFilter = {
  key: "status",
  label: "Status",
  options: [
    { value: "", label: "All statuses" },
    { value: "Unsubmitted", label: "Unsubmitted" },
    { value: "Open", label: "Open" },
    { value: "AwaitingApproval", label: "Awaiting Approval" },
    { value: "Completed", label: "Completed" },
    { value: "Declined", label: "Declined" },
    { value: "Canceled", label: "Canceled" },
  ],
};

function ReturnsListContent() {
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
  } = useReturns();

  return (
    <Stack spacing={2}>
      <PageHeader
        icon={AssignmentReturn}
        title="Returns"
        description="Review and process order return requests."
        color="secondary"
      />
      <OcDataGridToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search returns..."
        filters={[RETURN_STATUS_FILTER]}
        filterValues={filters}
        onFilterChange={setFilter}
      />
      <OcDataGrid
        columns={returnColumns}
        data={items}
        rowKey={(orderReturn) => orderReturn.ID ?? ""}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        onRetry={() => router.refresh()}
        emptyTitle="No returns"
        emptyDescription="Order returns will show up here once requested."
        search={search}
        onClearSearch={() => setSearch("")}
        meta={meta}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        sortBy={sortBy}
        onSortChange={setSortBy}
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
