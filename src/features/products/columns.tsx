import type { GridColDef } from "@mui/x-data-grid";
import type { Product } from "ordercloud-javascript-sdk";
import { Box, Chip, Typography } from "@mui/material";

export const productColumns: GridColDef<Product>[] = [
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
    field: "quantityMultiplier",
    headerName: "Qty Multiplier",
    width: 150,
    valueGetter: (_, row) => row.QuantityMultiplier ?? 1,
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
