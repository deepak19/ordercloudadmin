"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Promotion } from "ordercloud-javascript-sdk";
import { Box, Button, CircularProgress, Divider, Grid, Stack, Typography } from "@mui/material";

import { promotionSchema, type PromotionFormValues } from "@/features/promotions/schema";
import { FormTextField } from "@/components/form/form-text-field";
import { FormSwitch } from "@/components/form/form-switch";

interface PromotionFormProps {
  mode: "create" | "edit";
  defaultValues?: Promotion;
  onSubmit: (values: PromotionFormValues) => void;
  isSubmitting?: boolean;
}

export function PromotionForm({
  mode,
  defaultValues,
  onSubmit,
  isSubmitting,
}: PromotionFormProps) {
  const { handleSubmit, control } = useForm<PromotionFormValues>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      ID: defaultValues?.ID ?? "",
      Code: defaultValues?.Code ?? "",
      Name: defaultValues?.Name ?? "",
      Description: defaultValues?.Description ?? "",
      EligibleExpression: defaultValues?.EligibleExpression ?? "true",
      ValueExpression: defaultValues?.ValueExpression ?? "",
      RedemptionLimit: defaultValues?.RedemptionLimit ?? undefined,
      RedemptionLimitPerUser: defaultValues?.RedemptionLimitPerUser ?? undefined,
      CanCombine: defaultValues?.CanCombine ?? true,
      AutoApply: defaultValues?.AutoApply ?? false,
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
            label="Promotion ID"
            placeholder="Auto-generated if left blank"
          />
        )}
        <FormTextField control={control} name="Code" label="Code" placeholder="SUMMER10" />
        <FormTextField control={control} name="Name" label="Name" />
        <FormTextField control={control} name="Description" label="Description" multiline rows={3} />

        <Divider textAlign="left">
          <Typography variant="overline" color="text.secondary">
            Rule
          </Typography>
        </Divider>

        <FormTextField
          control={control}
          name="EligibleExpression"
          label="Eligible Expression"
          multiline
          rows={2}
          helperText="An OrderCloud rule expression, e.g. order.Subtotal gt 100"
          slotProps={{ input: { sx: { fontFamily: "monospace", fontSize: 13 } } }}
        />
        <FormTextField
          control={control}
          name="ValueExpression"
          label="Value Expression"
          multiline
          rows={2}
          helperText="e.g. order.Subtotal * 0.1"
          slotProps={{ input: { sx: { fontFamily: "monospace", fontSize: 13 } } }}
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <FormTextField
              control={control}
              name="RedemptionLimit"
              label="Redemption Limit"
              type="number"
              numeric
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <FormTextField
              control={control}
              name="RedemptionLimitPerUser"
              label="Limit Per User"
              type="number"
              numeric
            />
          </Grid>
        </Grid>

        <FormSwitch control={control} name="CanCombine" label="Can combine with other promotions" />
        <FormSwitch control={control} name="AutoApply" label="Auto apply" />
        <FormSwitch control={control} name="Active" label="Active" />

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ width: "fit-content" }}
          startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          {mode === "create" ? "Create promotion" : "Save changes"}
        </Button>
      </Stack>
    </Box>
  );
}
