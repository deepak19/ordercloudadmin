"use client";

import Link from "next/link";
import { ArrowBack, Business } from "@mui/icons-material";
import { Button, Card, CardContent, Stack } from "@mui/material";

import { useCreateSupplier } from "@/features/suppliers/hooks";
import { SupplierForm } from "@/features/suppliers/supplier-form";
import { PageHeader } from "@/components/page-header";

export default function NewSupplierPage() {
  const createSupplier = useCreateSupplier();

  return (
    <Stack spacing={2}>
      <Button
        variant="text"
        size="small"
        startIcon={<ArrowBack />}
        component={Link}
        href="/suppliers"
        sx={{ width: "fit-content" }}
      >
        Back to suppliers
      </Button>
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
