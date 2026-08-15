"use client";

import { Card, CardContent, CircularProgress, Stack } from "@mui/material";
import { Storefront } from "@mui/icons-material";

import { useAuth } from "@/providers/auth-provider";
import { useSupplier, useUpdateSupplier } from "@/features/suppliers/hooks";
import { SupplierForm } from "@/features/suppliers/supplier-form";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";

export default function MySupplierPage() {
  const { user } = useAuth();
  const supplierID = user?.Supplier?.ID;
  const { data: supplier, isLoading } = useSupplier(supplierID ?? "");
  const updateSupplier = useUpdateSupplier();

  if (!supplierID) {
    return (
      <EmptyState
        title="No supplier organization"
        description="This account is not associated with a supplier organization."
      />
    );
  }

  return (
    <Stack spacing={2}>
      <PageHeader
        icon={Storefront}
        title="My Supplier"
        description="Manage your own supplier organization's details."
        color="secondary"
      />
      {isLoading || !supplier ? (
        <CircularProgress size={24} />
      ) : (
        <Card>
          <CardContent>
            <SupplierForm
              mode="edit"
              defaultValues={supplier}
              isSubmitting={updateSupplier.isPending}
              onSubmit={(values) => updateSupplier.mutate({ supplierID, values })}
            />
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
