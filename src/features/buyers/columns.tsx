import type { GridColDef } from "@mui/x-data-grid";
import type { Buyer } from "ordercloud-javascript-sdk";
import { Box, Chip, Typography } from "@mui/material";

// `field` values are OrderCloud model properties so server-side sortBy works.
export const buyerColumns: GridColDef<Buyer>[] = [
  {
    field: "Name",
    headerName: "Name",
    flex: 1,
    minWidth: 240,
    renderCell: (params) => (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
          {params.row.Name}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {params.row.ID}
        </Typography>
      </Box>
    ),
  },
  {
    field: "DefaultCatalogID",
    headerName: "Default Catalog",
    flex: 1,
    sortable: false,
    valueGetter: (_, row) => row.DefaultCatalogID ?? "—",
  },
  {
    field: "Active",
    headerName: "Status",
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <Chip
        size="small"
        label={params.row.Active ? "Active" : "Inactive"}
        color={params.row.Active ? "success" : "default"}
        variant={params.row.Active ? "filled" : "outlined"}
      />
    ),
  },
];
