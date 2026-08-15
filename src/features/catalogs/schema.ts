import { z } from "zod";

export const catalogSchema = z.object({
  ID: z
    .string()
    .max(100)
    .regex(/^[\w-]*$/, "Only letters, numbers, hyphens and underscores")
    .optional()
    .or(z.literal("")),
  Name: z.string().min(1, "Name is required").max(200),
  Description: z.string().max(2000).optional().or(z.literal("")),
  Active: z.boolean(),
});

export type CatalogFormValues = z.infer<typeof catalogSchema>;
