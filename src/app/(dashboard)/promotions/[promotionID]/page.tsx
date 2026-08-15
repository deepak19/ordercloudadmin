"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowBack, Delete, LocalOffer } from "@mui/icons-material";
import { Button, Card, CardContent, CircularProgress, Stack } from "@mui/material";

import {
  useDeletePromotion,
  usePromotion,
  useUpdatePromotion,
} from "@/features/promotions/hooks";
import { PromotionForm } from "@/features/promotions/promotion-form";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { PageHeader } from "@/components/page-header";

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
        <Button variant="text" size="small" startIcon={<ArrowBack />} component={Link} href="/promotions">
          Back to promotions
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
        icon={LocalOffer}
        title={promotion?.Code || "Edit promotion"}
        description="Update this promotion's rules and details."
        color="error"
      />
      {isLoading || !promotion ? (
        <CircularProgress size={24} />
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
