"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Supplier } from "ordercloud-javascript-sdk";
import { Box, Button, CircularProgress, Stack } from "@mui/material";

import { supplierSchema, type SupplierFormValues } from "@/features/suppliers/schema";
import { FormTextField } from "@/components/form/form-text-field";
import { FormSwitch } from "@/components/form/form-switch";

interface SupplierFormProps {
  mode: "create" | "edit";
  defaultValues?: Supplier;
  onSubmit: (values: SupplierFormValues) => void;
  isSubmitting?: boolean;
}

export function SupplierForm({
  mode,
  defaultValues,
  onSubmit,
  isSubmitting,
}: SupplierFormProps) {
  const { handleSubmit, control } = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      ID: defaultValues?.ID ?? "",
      Name: defaultValues?.Name ?? "",
      AllBuyersCanOrder: defaultValues?.AllBuyersCanOrder ?? false,
      Active: defaultValues?.Active ?? true,
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 640 }}>
      <Stack spacing={2.5}>
        {mode === "create" && (
          <FormTextField
            control={control}
            name="ID"
            label="Supplier ID"
            placeholder="Auto-generated if left blank"
          />
        )}
        <FormTextField control={control} name="Name" label="Name" />
        <FormSwitch control={control} name="AllBuyersCanOrder" label="All buyers can order" />
        <FormSwitch control={control} name="Active" label="Active" />
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ width: "fit-content" }}
          startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          {mode === "create" ? "Create supplier" : "Save changes"}
        </Button>
      </Stack>
    </Box>
  );
}
