import { Inbox, SearchOff, WarningAmber } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

interface EmptyStateProps {
  icon?: SvgIconComponent;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon = Inbox,
  title = "No results",
  description = "There's nothing here yet.",
  action,
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
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320 }}>
        {description}
      </Typography>
      {action && <Stack sx={{ pt: 1 }}>{action}</Stack>}
    </Stack>
  );
}

/** Shown when a search/filter yields no matches — distinct from a truly empty collection. */
export function NoSearchResults({
  search,
  onClear,
}: {
  search: string;
  onClear?: () => void;
}) {
  return (
    <EmptyState
      icon={SearchOff}
      title="No matches"
      description={`No results for "${search}". Try a different search term.`}
      action={
        onClear ? (
          <Button size="small" variant="outlined" onClick={onClear}>
            Clear search
          </Button>
        ) : undefined
      }
    />
  );
}

/** Shown when the list request itself failed. */
export function ErrorState({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      icon={WarningAmber}
      title="Couldn't load data"
      description={message ?? "Something went wrong while loading. Please try again."}
      action={
        onRetry ? (
          <Button size="small" variant="outlined" onClick={onRetry}>
            Retry
          </Button>
        ) : undefined
      }
    />
  );
}
