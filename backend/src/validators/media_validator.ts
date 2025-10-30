import { z } from "zod";

export const MediaType = z.enum(["MOVIE", "TV_SHOW"]);

export const createMediaSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  type: MediaType,
  director: z.string().min(1, "Director is required").max(255),
  budget: z.number().positive("Budget must be positive"),
  location: z.string().min(1, "Location is required").max(255),
  duration: z.number().int().positive("Duration must be a positive integer"),
  year: z
    .number()
    .int()
    .min(1888, "Year must be 1888 or later")
    .max(new Date().getFullYear() + 5),
  description: z.string().optional(),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const updateMediaSchema = createMediaSchema.partial();

export const querySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 20)),
  search: z.string().optional(),
  type: MediaType.optional(),
});

export type CreateMediaInput = z.infer<typeof createMediaSchema>;
export type UpdateMediaInput = z.infer<typeof updateMediaSchema>;
export type QueryInput = z.infer<typeof querySchema>;
