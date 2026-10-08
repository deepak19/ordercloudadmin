"use client";

import { Business } from "@mui/icons-material";
import { Card, CardContent, Stack } from "@mui/material";

import { BackButton } from "@/components/back-button";

import { useCreateSupplier } from "@/features/suppliers/hooks";
import { SupplierForm } from "@/features/suppliers/supplier-form";
import { PageHeader } from "@/components/page-header";

export default function NewSupplierPage() {
  const createSupplier = useCreateSupplier();

  return (
    <Stack spacing={2}>
      <BackButton href="/suppliers" label="Back to suppliers" />
      <PageHeader icon={Business} title="New supplier" description="Create a new supplier organization." color="secondary" />
      <Card>
        <CardContent>
          <SupplierForm
            mode="create"
            isSubmitting={createSupplier.isPending}
            onSubmit={(values) => createSupplier.mutate(values)}
          />
        </CardContent>
      </Card>
    </Stack>
  );
}
