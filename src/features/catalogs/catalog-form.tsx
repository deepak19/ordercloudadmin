"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Catalog } from "ordercloud-javascript-sdk";
import { Box, Button, CircularProgress, Stack } from "@mui/material";

import { catalogSchema, type CatalogFormValues } from "@/features/catalogs/schema";
import { FormTextField } from "@/components/form/form-text-field";
import { FormSwitch } from "@/components/form/form-switch";

interface CatalogFormProps {
  mode: "create" | "edit";
  defaultValues?: Catalog;
  onSubmit: (values: CatalogFormValues) => void;
  isSubmitting?: boolean;
}

export function CatalogForm({
  mode,
  defaultValues,
  onSubmit,
  isSubmitting,
}: CatalogFormProps) {
  const { handleSubmit, control } = useForm<CatalogFormValues>({
    resolver: zodResolver(catalogSchema),
    defaultValues: {
      ID: defaultValues?.ID ?? "",
      Name: defaultValues?.Name ?? "",
      Description: defaultValues?.Description ?? "",
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
            label="Catalog ID"
            placeholder="Auto-generated if left blank"
          />
        )}
        <FormTextField control={control} name="Name" label="Name" />
        <FormTextField control={control} name="Description" label="Description" multiline rows={3} />
        <FormSwitch control={control} name="Active" label="Active" />
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ width: "fit-content" }}
          startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          {mode === "create" ? "Create catalog" : "Save changes"}
        </Button>
      </Stack>
    </Box>
  );
}
