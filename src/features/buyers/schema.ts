import { z } from "zod";

export const buyerSchema = z.object({
  ID: z
    .string()
    .max(100)
    .regex(/^[\w-]*$/, "Only letters, numbers, hyphens and underscores")
    .optional()
    .or(z.literal("")),
  Name: z.string().min(1, "Name is required").max(200),
  DefaultCatalogID: z.string().max(100).optional().or(z.literal("")),
  Active: z.boolean(),
});

export type BuyerFormValues = z.infer<typeof buyerSchema>;
