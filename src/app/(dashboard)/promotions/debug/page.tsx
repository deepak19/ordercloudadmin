"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { BugReport, Refresh, Search } from "@mui/icons-material";

import { useOrderPromotionsDebug, useRefreshPromotions } from "@/features/promotions/debug-hooks";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";

export default function PromotionDebugPage() {
  const [orderIDInput, setOrderIDInput] = useState("");
  const [orderID, setOrderID] = useState<string | null>(null);

  const { applied, eligible } = useOrderPromotionsDebug(orderID);
  const refresh = useRefreshPromotions(orderID);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOrderID(orderIDInput.trim() || null);
    refresh.reset();
  }

  return (
    <Stack spacing={2}>
      <PageHeader
        icon={BugReport}
        title="Promotion Debug"
        description="Look up an order to see which promotions are applied or eligible, and why."
        color="error"
      />

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                label="Order ID"
                value={orderIDInput}
                onChange={(e) => setOrderIDInput(e.target.value)}
                sx={{ maxWidth: 320, flex: 1 }}
              />
              <Button type="submit" variant="contained" startIcon={<Search />}>
                Load
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {orderID && (
        <>
          <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Refresh />}
              disabled={refresh.isPending}
              onClick={() => refresh.mutate()}
            >
              Re-run evaluation
            </Button>
          </Stack>

          {refresh.data && (
            <Stack spacing={1}>
              {(refresh.data.PromosAdded?.length ?? 0) === 0 &&
                (refresh.data.PromosRemoved?.length ?? 0) === 0 && (
                  <Alert severity="info">No changes — applied promotions are already up to date.</Alert>
                )}
              {refresh.data.PromosAdded?.map((promo) => (
                <Alert key={`added-${promo.ID}`} severity="success">
                  <strong>{promo.Code}</strong> was applied ({promo.Amount != null ? `$${promo.Amount.toFixed(2)}` : "—"})
                </Alert>
              ))}
              {refresh.data.PromosRemoved?.map((promo) => (
                <Alert key={`removed-${promo.ID}`} severity="warning">
                  <strong>{promo.Code}</strong> was removed — {promo.Reason ?? "no reason given"}
                  {promo.ErrorCode ? ` (${promo.ErrorCode})` : ""}
                </Alert>
              ))}
            </Stack>
          )}

          <Card>
            <CardHeader title="Applied Promotions" />
            <CardContent>
              {applied.isLoading ? (
                <CircularProgress size={24} />
              ) : (applied.data?.Items?.length ?? 0) === 0 ? (
                <EmptyState
                  title="No applied promotions"
                  description="This order has no currently applied promotions."
                />
              ) : (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Code</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Line Item</TableCell>
                      <TableCell>Date Applied</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applied.data?.Items?.map((promo) => (
                      <TableRow key={promo.ID}>
                        <TableCell>{promo.Code}</TableCell>
                        <TableCell>{promo.Name}</TableCell>
                        <TableCell>{promo.Amount != null ? `$${promo.Amount.toFixed(2)}` : "—"}</TableCell>
                        <TableCell>{promo.LineItemID ?? "—"}</TableCell>
                        <TableCell>
                          {promo.DateApplied ? new Date(promo.DateApplied).toLocaleString() : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Eligible Promotions" />
            <CardContent>
              {eligible.isLoading ? (
                <CircularProgress size={24} />
              ) : (eligible.data?.Items?.length ?? 0) === 0 ? (
                <EmptyState
                  title="No eligible promotions"
                  description="No promotions currently qualify for this order."
                />
              ) : (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Code</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Eligible Expression</TableCell>
                      <TableCell>Value Expression</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {eligible.data?.Items?.map((promo) => (
                      <TableRow key={promo.ID}>
                        <TableCell>{promo.Code}</TableCell>
                        <TableCell>{promo.Name}</TableCell>
                        <TableCell sx={{ fontFamily: "monospace", fontSize: 12 }}>
                          {promo.EligibleExpression}
                        </TableCell>
                        <TableCell sx={{ fontFamily: "monospace", fontSize: 12 }}>
                          {promo.ValueExpression}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </Stack>
  );
}
