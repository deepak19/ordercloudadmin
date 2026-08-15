import { z } from "zod";

export const promotionSchema = z.object({
  ID: z
    .string()
    .max(100)
    .regex(/^[\w-]*$/, "Only letters, numbers, hyphens and underscores")
    .optional()
    .or(z.literal("")),
  Code: z.string().min(1, "Code is required").max(100),
  Name: z.string().max(200).optional().or(z.literal("")),
  Description: z.string().max(2000).optional().or(z.literal("")),
  EligibleExpression: z.string().min(1, "Eligible expression is required").max(2000),
  ValueExpression: z.string().min(1, "Value expression is required").max(2000),
  RedemptionLimit: z.number().int().min(0).optional(),
  RedemptionLimitPerUser: z.number().int().min(0).optional(),
  CanCombine: z.boolean(),
  AutoApply: z.boolean(),
  Active: z.boolean(),
});

export type PromotionFormValues = z.infer<typeof promotionSchema>;
