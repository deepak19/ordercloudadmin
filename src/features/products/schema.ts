import { z } from "zod";

export const productSchema = z.object({
  ID: z
    .string()
    .max(100)
    .regex(/^[\w-]*$/, "Only letters, numbers, hyphens and underscores")
    .optional()
    .or(z.literal("")),
  Name: z.string().min(1, "Name is required").max(200),
  Description: z.string().max(2000).optional().or(z.literal("")),
  QuantityMultiplier: z.number().int().min(1).optional(),
  ShipWeight: z.number().min(0).optional(),
  ShipHeight: z.number().min(0).optional(),
  ShipWidth: z.number().min(0).optional(),
  ShipLength: z.number().min(0).optional(),
  Active: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
