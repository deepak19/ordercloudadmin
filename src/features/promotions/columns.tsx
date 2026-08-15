import type { GridColDef } from "@mui/x-data-grid";
import type { Promotion } from "ordercloud-javascript-sdk";
import { Box, Chip, Typography } from "@mui/material";

export const promotionColumns: GridColDef<Promotion>[] = [
  {
    field: "code",
    headerName: "Code",
    flex: 1,
    renderCell: (params) => (
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {params.row.Code}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {params.row.Name}
        </Typography>
      </Box>
    ),
  },
  {
    field: "redemptions",
    headerName: "Redemptions",
    width: 150,
    valueGetter: (_, row) =>
      `${row.RedemptionCount ?? 0}${row.RedemptionLimit ? ` / ${row.RedemptionLimit}` : ""}`,
  },
  {
    field: "autoApply",
    headerName: "Auto Apply",
    width: 130,
    valueGetter: (_, row) => (row.AutoApply ? "Yes" : "No"),
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
