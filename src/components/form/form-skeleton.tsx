import { Card, CardContent, Skeleton, Stack } from "@mui/material";

/** Form-shaped placeholder shown while a detail record loads — avoids the layout jump of a bare spinner. */
export function FormSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2.5} sx={{ maxWidth: 640 }}>
          {Array.from({ length: rows }).map((_, i) => (
            <Stack key={i} spacing={0.75}>
              <Skeleton variant="text" width={120} height={18} />
              <Skeleton variant="rounded" height={40} />
            </Stack>
          ))}
          <Skeleton variant="rounded" width={140} height={40} />
        </Stack>
      </CardContent>
    </Card>
  );
}
