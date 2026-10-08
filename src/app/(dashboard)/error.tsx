"use client";

import { useEffect } from "react";
import { Refresh, WarningAmber } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { getErrorMessage } from "@/lib/ordercloud/errors";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Stack
      spacing={2}
      sx={{ alignItems: "center", justifyContent: "center", textAlign: "center", py: 10, px: 3 }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: (theme) => alpha(theme.palette.error.main, 0.12),
          color: "error.main",
        }}
      >
        <WarningAmber />
      </Box>
      <Typography variant="h6">Something went wrong</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
        {getErrorMessage(error)}
      </Typography>
      <Button variant="contained" startIcon={<Refresh />} onClick={reset}>
        Try again
      </Button>
    </Stack>
  );
}
