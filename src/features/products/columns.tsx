import type { GridColDef } from "@mui/x-data-grid";
import type { Product } from "ordercloud-javascript-sdk";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import { ImageNotSupported } from "@mui/icons-material";

import { firstImageUrl } from "@/features/products/images";

// `field` values are OrderCloud model properties so server-side sortBy works.
export const productColumns: GridColDef<Product>[] = [
  {
    field: "image",
    headerName: "",
    width: 64,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const url = firstImageUrl(params.row);
      return (
        <Avatar
          variant="rounded"
          src={url}
          alt={params.row.Name ?? ""}
          sx={{
            width: 40,
            height: 40,
            bgcolor: "action.hover",
            color: "text.disabled",
            "& img": { objectFit: "contain" },
          }}
        >
          <ImageNotSupported fontSize="small" />
        </Avatar>
      );
    },
  },
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
    field: "QuantityMultiplier",
    headerName: "Qty Multiplier",
    width: 150,
    valueGetter: (_, row) => row.QuantityMultiplier ?? 1,
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
