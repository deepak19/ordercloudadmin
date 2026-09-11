"use client";

import { use, useState } from "react";
import { Delete, LocalOffer } from "@mui/icons-material";
import { Button, Card, CardContent, Stack } from "@mui/material";

import { BackButton } from "@/components/back-button";

import {
  useDeletePromotion,
  usePromotion,
  useUpdatePromotion,
} from "@/features/promotions/hooks";
import { PromotionForm } from "@/features/promotions/promotion-form";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { PageHeader } from "@/components/page-header";
import { FormSkeleton } from "@/components/form/form-skeleton";

export default function EditPromotionPage({
  params,
}: {
  params: Promise<{ promotionID: string }>;
}) {
  const { promotionID } = use(params);
  const { data: promotion, isLoading } = usePromotion(promotionID);
  const updatePromotion = useUpdatePromotion();
  const deletePromotion = useDeletePromotion();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <BackButton href="/promotions" label="Back to promotions" />
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
        icon={LocalOffer}
        title={promotion?.Code || "Edit promotion"}
        description="Update this promotion's rules and details."
        color="secondary"
      />
      {isLoading || !promotion ? (
<FormSkeleton />
      ) : (
        <Card>
          <CardContent>
            <PromotionForm
              mode="edit"
              defaultValues={promotion}
              isSubmitting={updatePromotion.isPending}
              onSubmit={(values) => updatePromotion.mutate({ promotionID, values })}
            />
          </CardContent>
        </Card>
      )}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this promotion?"
        description={`This action cannot be undone. This will permanently delete the promotion ${promotion?.Code ? `"${promotion.Code}"` : ""}.`}
        isPending={deletePromotion.isPending}
        onConfirm={() => deletePromotion.mutate(promotionID)}
      />
    </Stack>
  );
}
