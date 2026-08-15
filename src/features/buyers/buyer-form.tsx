"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Buyer } from "ordercloud-javascript-sdk";
import { Box, Button, CircularProgress, Stack } from "@mui/material";

import { buyerSchema, type BuyerFormValues } from "@/features/buyers/schema";
import { FormTextField } from "@/components/form/form-text-field";
import { FormSwitch } from "@/components/form/form-switch";

interface BuyerFormProps {
  mode: "create" | "edit";
  defaultValues?: Buyer;
  onSubmit: (values: BuyerFormValues) => void;
  isSubmitting?: boolean;
}

export function BuyerForm({
  mode,
  defaultValues,
  onSubmit,
  isSubmitting,
}: BuyerFormProps) {
  const { handleSubmit, control } = useForm<BuyerFormValues>({
    resolver: zodResolver(buyerSchema),
    defaultValues: {
      ID: defaultValues?.ID ?? "",
      Name: defaultValues?.Name ?? "",
      DefaultCatalogID: defaultValues?.DefaultCatalogID ?? "",
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
            label="Buyer ID"
            placeholder="Auto-generated if left blank"
          />
        )}
        <FormTextField control={control} name="Name" label="Name" />
        <FormTextField control={control} name="DefaultCatalogID" label="Default Catalog ID" />
        <FormSwitch control={control} name="Active" label="Active" />
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ width: "fit-content" }}
          startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          {mode === "create" ? "Create buyer" : "Save changes"}
        </Button>
      </Stack>
    </Box>
  );
}
