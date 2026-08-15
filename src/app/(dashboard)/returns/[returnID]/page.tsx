"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowBack, AssignmentReturn, Block, CheckCircle, ThumbDown, ThumbUp } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  useApproveReturn,
  useCancelReturn,
  useCompleteReturn,
  useDeclineReturn,
  useReturn,
} from "@/features/returns/hooks";
import { DetailField } from "@/components/detail-field";
import { PageHeader } from "@/components/page-header";

export default function ReturnDetailPage({
  params,
}: {
  params: Promise<{ returnID: string }>;
}) {
  const { returnID } = use(params);
  const { data: orderReturn, isLoading } = useReturn(returnID);
  const approveReturn = useApproveReturn();
  const declineReturn = useDeclineReturn();
  const cancelReturn = useCancelReturn();
  const completeReturn = useCompleteReturn();

  if (isLoading || !orderReturn) {
    return <CircularProgress size={24} />;
  }

  const canApproveOrDecline = orderReturn.Status === "AwaitingApproval";
  const canComplete = orderReturn.Status === "Open";
  const canCancel = orderReturn.Status === "Open" || orderReturn.Status === "AwaitingApproval";

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Button variant="text" size="small" startIcon={<ArrowBack />} component={Link} href="/returns">
          Back to returns
        </Button>
        <Stack direction="row" spacing={1}>
          {canApproveOrDecline && (
            <>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ThumbUp />}
                disabled={approveReturn.isPending}
                onClick={() => approveReturn.mutate(returnID)}
              >
                Approve
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ThumbDown />}
                disabled={declineReturn.isPending}
                onClick={() => declineReturn.mutate(returnID)}
              >
                Decline
              </Button>
            </>
          )}
          {canComplete && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<CheckCircle />}
              disabled={completeReturn.isPending}
              onClick={() => completeReturn.mutate(returnID)}
            >
              Complete
            </Button>
          )}
          {canCancel && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<Block />}
              disabled={cancelReturn.isPending}
              onClick={() => cancelReturn.mutate(returnID)}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>

      <PageHeader
        icon={AssignmentReturn}
        title={`Return ${orderReturn.ID}`}
        description="Review return details and take lifecycle actions."
        color="secondary"
      />

      <Card>
        <CardHeader
          title="Return Summary"
          action={
            <Chip
              label={orderReturn.Status}
              color={
                orderReturn.Status === "Declined" || orderReturn.Status === "Canceled"
                  ? "error"
                  : "primary"
              }
              sx={{ mr: 2, mt: 1 }}
            />
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 4 }}>
              <DetailField
                label="Order"
                value={
                  <Typography
                    component={Link}
                    href={`/orders/${orderReturn.OrderID}`}
                    variant="body2"
                    sx={{ fontWeight: 500, textDecoration: "underline" }}
                  >
                    {orderReturn.OrderID}
                  </Typography>
                }
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <DetailField
                label="Refund Amount"
                value={orderReturn.RefundAmount != null ? `$${orderReturn.RefundAmount.toFixed(2)}` : undefined}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <DetailField
                label="Date Submitted"
                value={
                  orderReturn.DateSubmitted
                    ? new Date(orderReturn.DateSubmitted).toLocaleString()
                    : undefined
                }
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <DetailField label="Items to Return" value={orderReturn.ItemsToReturn?.length ?? 0} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {orderReturn.Comments && (
        <Card>
          <CardHeader title="Comments" />
          <CardContent>
            <Typography variant="body2">{orderReturn.Comments}</Typography>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
