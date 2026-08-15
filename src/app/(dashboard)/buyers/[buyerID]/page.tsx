"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowBack, Delete, People } from "@mui/icons-material";
import { Button, Card, CardContent, CircularProgress, Stack } from "@mui/material";

import { useBuyer, useDeleteBuyer, useUpdateBuyer } from "@/features/buyers/hooks";
import { BuyerForm } from "@/features/buyers/buyer-form";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { PageHeader } from "@/components/page-header";

export default function EditBuyerPage({
  params,
}: {
  params: Promise<{ buyerID: string }>;
}) {
  const { buyerID } = use(params);
  const { data: buyer, isLoading } = useBuyer(buyerID);
  const updateBuyer = useUpdateBuyer();
  const deleteBuyer = useDeleteBuyer();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Button variant="text" size="small" startIcon={<ArrowBack />} component={Link} href="/buyers">
          Back to buyers
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          startIcon={<Delete />}
          onClick={() => setConfirmOpen(true)}
        >
          Delete
        </Button>
      </Stack>
      <PageHeader
        icon={People}
        title={buyer?.Name || "Edit buyer"}
        description="Update this buyer organization's details."
        color="primary"
      />
      {isLoading || !buyer ? (
        <CircularProgress size={24} />
      ) : (
        <Card>
          <CardContent>
            <BuyerForm
              mode="edit"
              defaultValues={buyer}
              isSubmitting={updateBuyer.isPending}
              onSubmit={(values) => updateBuyer.mutate({ buyerID, values })}
            />
          </CardContent>
        </Card>
      )}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this buyer?"
        description={`This action cannot be undone. This will permanently delete the buyer ${buyer?.Name ? `"${buyer.Name}"` : ""}.`}
        isPending={deleteBuyer.isPending}
        onConfirm={() => deleteBuyer.mutate(buyerID)}
      />
    </Stack>
  );
}
