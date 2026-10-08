"use client";

import { use, useState } from "react";
import { Business, Delete } from "@mui/icons-material";
import { Button, Card, CardContent, Stack } from "@mui/material";

import { BackButton } from "@/components/back-button";

import {
  useDeleteSupplier,
  useSupplier,
  useUpdateSupplier,
} from "@/features/suppliers/hooks";
import { SupplierForm } from "@/features/suppliers/supplier-form";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { PageHeader } from "@/components/page-header";
import { FormSkeleton } from "@/components/form/form-skeleton";

export default function EditSupplierPage({
  params,
}: {
  params: Promise<{ supplierID: string }>;
}) {
  const { supplierID } = use(params);
  const { data: supplier, isLoading } = useSupplier(supplierID);
  const updateSupplier = useUpdateSupplier();
  const deleteSupplier = useDeleteSupplier();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <BackButton href="/suppliers" label="Back to suppliers" />
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
        icon={Business}
        title={supplier?.Name || "Edit supplier"}
        description="Update this supplier organization's details."
        color="secondary"
      />
      {isLoading || !supplier ? (
<FormSkeleton />
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
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this supplier?"
        description={`This action cannot be undone. This will permanently delete the supplier ${supplier?.Name ? `"${supplier.Name}"` : ""}.`}
        isPending={deleteSupplier.isPending}
        onConfirm={() => deleteSupplier.mutate(supplierID)}
      />
    </Stack>
  );
}
