"use client";

import Link from "next/link";
import { ArrowBack, LocalOffer } from "@mui/icons-material";
import { Button, Card, CardContent, Stack } from "@mui/material";

import { useCreatePromotion } from "@/features/promotions/hooks";
import { PromotionForm } from "@/features/promotions/promotion-form";
import { PageHeader } from "@/components/page-header";

export default function NewPromotionPage() {
  const createPromotion = useCreatePromotion();

  return (
    <Stack spacing={2}>
      <Button
        variant="text"
        size="small"
        startIcon={<ArrowBack />}
        component={Link}
        href="/promotions"
        sx={{ width: "fit-content" }}
      >
        Back to promotions
      </Button>
      <PageHeader icon={LocalOffer} title="New promotion" description="Create a new discount code or promotion." color="error" />
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
