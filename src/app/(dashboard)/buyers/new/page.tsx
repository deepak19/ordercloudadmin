"use client";

import { People } from "@mui/icons-material";
import { Card, CardContent, Stack } from "@mui/material";

import { BackButton } from "@/components/back-button";

import { useCreateBuyer } from "@/features/buyers/hooks";
import { BuyerForm } from "@/features/buyers/buyer-form";
import { PageHeader } from "@/components/page-header";

export default function NewBuyerPage() {
  const createBuyer = useCreateBuyer();

  return (
    <Stack spacing={2}>
      <BackButton href="/buyers" label="Back to buyers" />
      <PageHeader icon={People} title="New buyer" description="Create a new buyer organization." color="primary" />
      <Card>
        <CardContent>
          <BuyerForm
            mode="create"
            isSubmitting={createBuyer.isPending}
            onSubmit={(values) => createBuyer.mutate(values)}
          />
        </CardContent>
      </Card>
    </Stack>
  );
}
