import type { GridColDef } from "@mui/x-data-grid";
import type { Order } from "ordercloud-javascript-sdk";
import { Chip, Typography } from "@mui/material";

const statusColor: Record<string, "primary" | "default" | "error"> = {
  Open: "primary",
  Completed: "primary",
  Unsubmitted: "default",
  AwaitingApproval: "default",
  Declined: "error",
  Canceled: "error",
};

export const orderColumns: GridColDef<Order>[] = [
  {
    field: "id",
    headerName: "Order ID",
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {params.row.ID}
      </Typography>
    ),
  },
  {
    field: "from",
    headerName: "From",
    flex: 1,
    valueGetter: (_, row) => row.FromCompanyID ?? "—",
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => (
      <Chip size="small" label={params.row.Status} color={statusColor[params.row.Status ?? ""] ?? "default"} />
    ),
  },
  {
    field: "total",
    headerName: "Total",
    width: 120,
    valueGetter: (_, row) => (row.Total != null ? `$${row.Total.toFixed(2)}` : "—"),
  },
  {
    field: "dateSubmitted",
    headerName: "Date Submitted",
    width: 180,
    valueGetter: (_, row) => (row.DateSubmitted ? new Date(row.DateSubmitted).toLocaleDateString() : "—"),
  },
];
