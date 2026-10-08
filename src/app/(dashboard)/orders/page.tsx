"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Stack, Tab, Tabs } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

import { useOrders } from "@/features/orders/hooks";
import { orderColumns } from "@/features/orders/columns";
import { OcDataGrid } from "@/components/data-grid/oc-data-grid";
import { OcDataGridToolbar, type GridFilter } from "@/components/data-grid/oc-data-grid-toolbar";
import { PageHeader } from "@/components/page-header";

const ORDER_STATUS_FILTER: GridFilter = {
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

function OrdersListContent() {
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
    direction,
    filters,
    setPage,
    setPageSize,
    setSearch,
    setSortBy,
    setDirection,
    setFilter,
  } = useOrders();

  return (
    <Stack spacing={2}>
      <PageHeader
        icon={ShoppingCart}
        title="Orders"
        description="Track and manage orders placed across your marketplace."
        color="warning"
      />
      <Tabs value={direction} onChange={(_, value) => setDirection(value)}>
        <Tab label="All" value="All" />
        <Tab label="Incoming" value="Incoming" />
        <Tab label="Outgoing" value="Outgoing" />
      </Tabs>
      <OcDataGridToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search orders..."
        filters={[ORDER_STATUS_FILTER]}
        filterValues={filters}
        onFilterChange={setFilter}
      />
      <OcDataGrid
        columns={orderColumns}
        data={items}
        rowKey={(order) => order.ID ?? ""}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        onRetry={() => router.refresh()}
        emptyTitle="No orders"
        emptyDescription="Orders will show up here once submitted."
        search={search}
        onClearSearch={() => setSearch("")}
        meta={meta}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onRowClick={(order) => router.push(`/orders/${order.ID}`)}
      />
    </Stack>
  );
}

export default function OrdersPage() {
  return (
    <Suspense>
      <OrdersListContent />
    </Suspense>
  );
}
