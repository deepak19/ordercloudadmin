"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Stack, Tab, Tabs } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

import { useOrders } from "@/features/orders/hooks";
import { orderColumns } from "@/features/orders/columns";
import { OcDataGrid } from "@/components/data-grid/oc-data-grid";
import { OcDataGridToolbar } from "@/components/data-grid/oc-data-grid-toolbar";
import { PageHeader } from "@/components/page-header";

function OrdersListContent() {
  const router = useRouter();
  const { items, meta, isLoading, page, search, direction, setPage, setSearch, setDirection } =
    useOrders();

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
      <OcDataGridToolbar search={search} onSearchChange={setSearch} placeholder="Search orders..." />
      <OcDataGrid
        columns={orderColumns}
        data={items}
        rowKey={(order) => order.ID ?? ""}
        isLoading={isLoading}
        emptyTitle="No orders"
        emptyDescription="Orders will show up here once submitted."
        meta={meta}
        page={page}
        onPageChange={setPage}
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
