import { z } from "zod";

export const supplierSchema = z.object({
  ID: z
    .string()
    .max(100)
    .regex(/^[\w-]*$/, "Only letters, numbers, hyphens and underscores")
    .optional()
    .or(z.literal("")),
  Name: z.string().min(1, "Name is required").max(200),
  AllBuyersCanOrder: z.boolean(),
  Active: z.boolean(),
});

export type SupplierFormValues = z.infer<typeof supplierSchema>;
