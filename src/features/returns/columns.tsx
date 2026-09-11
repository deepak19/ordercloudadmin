import type { GridColDef } from "@mui/x-data-grid";
import type { OrderReturn } from "ordercloud-javascript-sdk";
import { Chip, Typography } from "@mui/material";

const statusColor: Record<string, "primary" | "default" | "error"> = {
  Open: "primary",
  Completed: "primary",
  Unsubmitted: "default",
  AwaitingApproval: "default",
  Declined: "error",
  Canceled: "error",
};

// `field` values are OrderCloud model properties so server-side sortBy works.
export const returnColumns: GridColDef<OrderReturn>[] = [
  {
    field: "ID",
    headerName: "Return ID",
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {params.row.ID}
      </Typography>
    ),
  },
  {
    field: "OrderID",
    headerName: "Order",
    flex: 1,
    valueGetter: (_, row) => row.OrderID,
  },
  {
    field: "Status",
    headerName: "Status",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <Chip
        size="small"
        label={params.row.Status}
        color={statusColor[params.row.Status ?? ""] ?? "default"}
      />
    ),
  },
  {
    field: "RefundAmount",
    headerName: "Refund Amount",
    width: 150,
    sortable: false,
    valueGetter: (_, row) => (row.RefundAmount != null ? `$${row.RefundAmount.toFixed(2)}` : "—"),
  },
];
