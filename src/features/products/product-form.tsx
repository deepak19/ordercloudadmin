"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "ordercloud-javascript-sdk";
import { Box, Button, CircularProgress, Divider, Grid, Stack, Typography } from "@mui/material";

import { productSchema, type ProductFormValues } from "@/features/products/schema";
import { FormTextField } from "@/components/form/form-text-field";
import { FormSwitch } from "@/components/form/form-switch";

interface ProductFormProps {
  mode: "create" | "edit";
  defaultValues?: Product;
  onSubmit: (values: ProductFormValues) => void;
  isSubmitting?: boolean;
}

export function ProductForm({
  mode,
  defaultValues,
  onSubmit,
  isSubmitting,
}: ProductFormProps) {
  const {
    handleSubmit,
    control,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ID: defaultValues?.ID ?? "",
      Name: defaultValues?.Name ?? "",
      Description: defaultValues?.Description ?? "",
      QuantityMultiplier: defaultValues?.QuantityMultiplier ?? 1,
      ShipWeight: defaultValues?.ShipWeight ?? undefined,
      ShipHeight: defaultValues?.ShipHeight ?? undefined,
      ShipWidth: defaultValues?.ShipWidth ?? undefined,
      ShipLength: defaultValues?.ShipLength ?? undefined,
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
            label="Product ID"
            placeholder="Auto-generated if left blank"
          />
        )}
        <FormTextField control={control} name="Name" label="Name" />
        <FormTextField control={control} name="Description" label="Description" multiline rows={4} />
        <FormSwitch control={control} name="Active" label="Active" />

        <Divider textAlign="left">
          <Typography variant="overline" color="text.secondary">
            Shipping
          </Typography>
        </Divider>

        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <FormTextField
              control={control}
              name="QuantityMultiplier"
              label="Quantity Multiplier"
              type="number"
              numeric
              slotProps={{ htmlInput: { min: 1 } }}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <FormTextField
              control={control}
              name="ShipWeight"
              label="Ship Weight"
              type="number"
              numeric
              slotProps={{ htmlInput: { step: 0.01 } }}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <FormTextField
              control={control}
              name="ShipHeight"
              label="Ship Height"
              type="number"
              numeric
              slotProps={{ htmlInput: { step: 0.01 } }}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <FormTextField
              control={control}
              name="ShipWidth"
              label="Ship Width"
              type="number"
              numeric
              slotProps={{ htmlInput: { step: 0.01 } }}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <FormTextField
              control={control}
              name="ShipLength"
              label="Ship Length"
              type="number"
              numeric
              slotProps={{ htmlInput: { step: 0.01 } }}
            />
          </Grid>
        </Grid>
        <Typography variant="caption" color="text.secondary">
          Shipping dimensions are used to calculate shipping rates.
        </Typography>

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ width: "fit-content" }}
          startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          {mode === "create" ? "Create product" : "Save changes"}
        </Button>
      </Stack>
    </Box>
  );
}
