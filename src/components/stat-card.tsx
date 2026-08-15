import Link from "next/link";
import { Box, Card, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { SvgIconComponent } from "@mui/icons-material";

import type { AccentColor } from "@/components/page-header";

interface StatCardProps {
  icon: SvgIconComponent;
  label: string;
  value: React.ReactNode;
  color: AccentColor;
  href?: string;
}

export function StatCard({ icon: Icon, label, value, color, href }: StatCardProps) {
  const card = (
    <Card
      sx={{
        p: 2.5,
        color: "#fff",
        border: "none",
        backgroundImage: (theme) =>
          `linear-gradient(135deg, ${theme.palette[color].main} 0%, ${theme.palette[color].dark} 100%)`,
        boxShadow: (theme) => `0 10px 24px ${alpha(theme.palette[color].main, 0.35)}`,
        transition: "transform 150ms ease, box-shadow 150ms ease",
        ...(href && {
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: (theme) => `0 14px 28px ${alpha(theme.palette[color].main, 0.45)}`,
          },
        }),
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            {label}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(255,255,255,0.22)",
          }}
        >
          <Icon />
        </Box>
      </Stack>
    </Card>
  );

  if (!href) return card;

  return (
    <Box component={Link} href={href} sx={{ textDecoration: "none", display: "block" }}>
      {card}
    </Box>
  );
}
