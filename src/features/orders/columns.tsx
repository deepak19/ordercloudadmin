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

// `field` values are OrderCloud model properties so server-side sortBy works.
export const orderColumns: GridColDef<Order>[] = [
  {
    field: "ID",
    headerName: "Order ID",
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {params.row.ID}
      </Typography>
    ),
  },
  {
    field: "FromCompanyID",
    headerName: "From",
    flex: 1,
    valueGetter: (_, row) => row.FromCompanyID ?? "—",
  },
  {
    field: "Status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => (
      <Chip size="small" label={params.row.Status} color={statusColor[params.row.Status ?? ""] ?? "default"} />
    ),
  },
  {
    field: "Total",
    headerName: "Total",
    width: 120,
    valueGetter: (_, row) => (row.Total != null ? `$${row.Total.toFixed(2)}` : "—"),
  },
  {
    field: "DateSubmitted",
    headerName: "Date Submitted",
    width: 180,
    valueGetter: (_, row) => (row.DateSubmitted ? new Date(row.DateSubmitted).toLocaleDateString() : "—"),
  },
];
