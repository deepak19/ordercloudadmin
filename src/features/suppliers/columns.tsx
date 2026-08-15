import type { GridColDef } from "@mui/x-data-grid";
import type { Supplier } from "ordercloud-javascript-sdk";
import { Box, Chip, Typography } from "@mui/material";

export const supplierColumns: GridColDef<Supplier>[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    renderCell: (params) => (
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {params.row.Name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {params.row.ID}
        </Typography>
      </Box>
    ),
  },
  {
    field: "allBuyersCanOrder",
    headerName: "All Buyers Can Order",
    flex: 1,
    valueGetter: (_, row) => (row.AllBuyersCanOrder ? "Yes" : "No"),
  },
  {
    field: "active",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <Chip
        size="small"
        label={params.row.Active ? "Active" : "Inactive"}
        color={params.row.Active ? "primary" : "default"}
      />
    ),
  },
];
