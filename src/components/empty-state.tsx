import { Inbox } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

interface EmptyStateProps {
  icon?: SvgIconComponent;
  title?: string;
  description?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title = "No results",
  description = "There's nothing here yet.",
}: EmptyStateProps) {
  return (
    <Stack
      spacing={1}
      sx={{ py: 6, px: 3, textAlign: "center", alignItems: "center", justifyContent: "center" }}
    >
      <Icon sx={{ fontSize: 32, color: "text.disabled" }} />
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Stack>
  );
}
