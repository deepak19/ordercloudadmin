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

export const returnColumns: GridColDef<OrderReturn>[] = [
  {
    field: "id",
    headerName: "Return ID",
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {params.row.ID}
      </Typography>
    ),
  },
  {
    field: "orderID",
    headerName: "Order",
    flex: 1,
    valueGetter: (_, row) => row.OrderID,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => (
      <Chip
        size="small"
        label={params.row.Status}
        color={statusColor[params.row.Status ?? ""] ?? "default"}
      />
    ),
  },
  {
    field: "refundAmount",
    headerName: "Refund Amount",
    width: 150,
    valueGetter: (_, row) => (row.RefundAmount != null ? `$${row.RefundAmount.toFixed(2)}` : "—"),
  },
];
