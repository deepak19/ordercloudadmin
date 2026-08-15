"use client";

import Link from "next/link";
import { ArrowBack, People } from "@mui/icons-material";
import { Button, Card, CardContent, Stack } from "@mui/material";

import { useCreateBuyer } from "@/features/buyers/hooks";
import { BuyerForm } from "@/features/buyers/buyer-form";
import { PageHeader } from "@/components/page-header";

export default function NewBuyerPage() {
  const createBuyer = useCreateBuyer();

  return (
    <Stack spacing={2}>
      <Button
        variant="text"
        size="small"
        startIcon={<ArrowBack />}
        component={Link}
        href="/buyers"
        sx={{ width: "fit-content" }}
      >
        Back to buyers
      </Button>
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
