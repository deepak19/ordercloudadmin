"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowBack, Block, CheckCircle, ShoppingCart } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useCancelOrder, useCompleteOrder, useOrder } from "@/features/orders/hooks";
import { DetailField } from "@/components/detail-field";
import { PageHeader } from "@/components/page-header";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderID: string }>;
}) {
  const { orderID } = use(params);
  const { data: order, isLoading } = useOrder("All", orderID);
  const cancelOrder = useCancelOrder();
  const completeOrder = useCompleteOrder();

  if (isLoading || !order) {
    return <CircularProgress size={24} />;
  }

  const canCancel = order.Status === "Open" || order.Status === "AwaitingApproval";
  const canComplete = order.Status === "Open";

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Button variant="text" size="small" startIcon={<ArrowBack />} component={Link} href="/orders">
          Back to orders
        </Button>
        <Stack direction="row" spacing={1}>
          {canComplete && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<CheckCircle />}
              disabled={completeOrder.isPending}
              onClick={() => completeOrder.mutate({ direction: "All", orderID })}
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
              disabled={cancelOrder.isPending}
              onClick={() => cancelOrder.mutate({ direction: "All", orderID })}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>

      <PageHeader
        icon={ShoppingCart}
        title={`Order ${order.ID}`}
        description="Review order details, totals, and take lifecycle actions."
        color="warning"
      />

      <Card>
        <CardHeader
          title="Order Summary"
          action={
            <Chip
              label={order.Status}
              color={order.Status === "Declined" || order.Status === "Canceled" ? "error" : "primary"}
              sx={{ mr: 2, mt: 1 }}
            />
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 4 }}>
              <DetailField label="From Company" value={order.FromCompanyID} />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <DetailField label="To Company" value={order.ToCompanyID} />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <DetailField label="Line Items" value={order.LineItemCount} />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <DetailField
                label="Date Submitted"
                value={order.DateSubmitted ? new Date(order.DateSubmitted).toLocaleString() : undefined}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <DetailField label="Shipping Address ID" value={order.ShippingAddressID} />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <DetailField label="Billing Address ID" value={order.BillingAddressID} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Totals" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <DetailField
                label="Subtotal"
                value={order.Subtotal != null ? `$${order.Subtotal.toFixed(2)}` : undefined}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <DetailField
                label="Shipping"
                value={order.ShippingCost != null ? `$${order.ShippingCost.toFixed(2)}` : undefined}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <DetailField label="Tax" value={order.TaxCost != null ? `$${order.TaxCost.toFixed(2)}` : undefined} />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <DetailField label="Total" value={order.Total != null ? `$${order.Total.toFixed(2)}` : undefined} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {order.Comments && (
        <Card>
          <CardHeader title="Comments" />
          <CardContent>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2">{order.Comments}</Typography>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
