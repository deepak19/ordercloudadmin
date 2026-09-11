"use client";

import { LocalOffer } from "@mui/icons-material";
import { Card, CardContent, Stack } from "@mui/material";

import { BackButton } from "@/components/back-button";

import { useCreatePromotion } from "@/features/promotions/hooks";
import { PromotionForm } from "@/features/promotions/promotion-form";
import { PageHeader } from "@/components/page-header";

export default function NewPromotionPage() {
  const createPromotion = useCreatePromotion();

  return (
    <Stack spacing={2}>
      <BackButton href="/promotions" label="Back to promotions" />
      <PageHeader icon={LocalOffer} title="New promotion" description="Create a new discount code or promotion." color="secondary" />
      <Card>
        <CardContent>
          <PromotionForm
            mode="create"
            isSubmitting={createPromotion.isPending}
            onSubmit={(values) => createPromotion.mutate(values)}
          />
        </CardContent>
      </Card>
    </Stack>
  );
}
