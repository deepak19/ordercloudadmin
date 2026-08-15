"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Category } from "ordercloud-javascript-sdk";
import { Box, Button, CircularProgress, Stack } from "@mui/material";

import { categorySchema, type CategoryFormValues } from "@/features/categories/schema";
import { FormTextField } from "@/components/form/form-text-field";
import { FormSwitch } from "@/components/form/form-switch";

interface CategoryFormProps {
  mode: "create" | "edit";
  defaultValues?: Category;
  onSubmit: (values: CategoryFormValues) => void;
  isSubmitting?: boolean;
}

export function CategoryForm({
  mode,
  defaultValues,
  onSubmit,
  isSubmitting,
}: CategoryFormProps) {
  const { handleSubmit, control } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      ID: defaultValues?.ID ?? "",
      Name: defaultValues?.Name ?? "",
      Description: defaultValues?.Description ?? "",
      ParentID: defaultValues?.ParentID ?? "",
      ListOrder: defaultValues?.ListOrder ?? undefined,
      Active: defaultValues?.Active ?? true,
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {mode === "create" && (
          <FormTextField
            control={control}
            name="ID"
            label="Category ID"
            placeholder="Auto-generated if left blank"
          />
        )}
        <FormTextField control={control} name="Name" label="Name" />
        <FormTextField control={control} name="Description" label="Description" multiline rows={3} />
        <FormTextField
          control={control}
          name="ParentID"
          label="Parent Category ID"
          placeholder="Leave blank for a top-level category"
        />
        <FormTextField control={control} name="ListOrder" label="List Order" type="number" numeric />
        <FormSwitch control={control} name="Active" label="Active" />
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ width: "fit-content" }}
          startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          {mode === "create" ? "Create category" : "Save changes"}
        </Button>
      </Stack>
    </Box>
  );
}
