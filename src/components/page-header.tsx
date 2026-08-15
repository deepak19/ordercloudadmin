import { Box, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { SvgIconComponent } from "@mui/icons-material";

export type AccentColor = "primary" | "secondary" | "success" | "warning" | "info" | "error";

interface PageHeaderProps {
  icon: SvgIconComponent;
  title: string;
  description?: string;
  action?: React.ReactNode;
  color?: AccentColor;
}

export function PageHeader({ icon: Icon, title, description, action, color = "primary" }: PageHeaderProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", rowGap: 1.5 }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 3,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: (theme) => alpha(theme.palette[color].main, theme.palette.mode === "dark" ? 0.24 : 0.12),
            color: (theme) => theme.palette[color].main,
          }}
        >
          <Icon />
        </Box>
        <Box>
          <Typography variant="h6">{title}</Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
      </Stack>
      {action}
    </Stack>
  );
}
