import type { GridColDef } from "@mui/x-data-grid";
import type { Promotion } from "ordercloud-javascript-sdk";
import { Box, Chip, Typography } from "@mui/material";

// `field` values are OrderCloud model properties so server-side sortBy works.
export const promotionColumns: GridColDef<Promotion>[] = [
  {
    field: "Code",
    headerName: "Code",
    flex: 1,
    minWidth: 240,
    renderCell: (params) => (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
          {params.row.Code}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {params.row.Name}
        </Typography>
      </Box>
    ),
  },
  {
    field: "RedemptionCount",
    headerName: "Redemptions",
    width: 150,
    sortable: false,
    valueGetter: (_, row) =>
      `${row.RedemptionCount ?? 0}${row.RedemptionLimit ? ` / ${row.RedemptionLimit}` : ""}`,
  },
  {
    field: "AutoApply",
    headerName: "Auto Apply",
    width: 130,
    valueGetter: (_, row) => (row.AutoApply ? "Yes" : "No"),
  },
  {
    field: "Active",
    headerName: "Status",
    width: 120,
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
