import type { GridColDef } from "@mui/x-data-grid";
import type { Buyer } from "ordercloud-javascript-sdk";
import { Box, Chip, Typography } from "@mui/material";

export const buyerColumns: GridColDef<Buyer>[] = [
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
    field: "defaultCatalog",
    headerName: "Default Catalog",
    flex: 1,
    valueGetter: (_, row) => row.DefaultCatalogID ?? "—",
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
