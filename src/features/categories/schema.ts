import { z } from "zod";

export const categorySchema = z.object({
  ID: z
    .string()
    .max(100)
    .regex(/^[\w-]*$/, "Only letters, numbers, hyphens and underscores")
    .optional()
    .or(z.literal("")),
  Name: z.string().min(1, "Name is required").max(200),
  Description: z.string().max(2000).optional().or(z.literal("")),
  ParentID: z.string().max(100).optional().or(z.literal("")),
  ListOrder: z.number().int().optional(),
  Active: z.boolean(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
