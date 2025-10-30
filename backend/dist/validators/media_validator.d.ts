import { z } from "zod";
export declare const MediaType: z.ZodEnum<["MOVIE", "TV_SHOW"]>;
export declare const createMediaSchema: z.ZodObject<{
    title: z.ZodString;
    type: z.ZodEnum<["MOVIE", "TV_SHOW"]>;
    director: z.ZodString;
    budget: z.ZodNumber;
    location: z.ZodString;
    duration: z.ZodNumber;
    year: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, "strip", z.ZodTypeAny, {
    type: "MOVIE" | "TV_SHOW";
    year: number;
    title: string;
    director: string;
    budget: number;
    location: string;
    duration: number;
    description?: string | undefined;
    imageUrl?: string | undefined;
}, {
    type: "MOVIE" | "TV_SHOW";
    year: number;
    title: string;
    director: string;
    budget: number;
    location: string;
    duration: number;
    description?: string | undefined;
    imageUrl?: string | undefined;
}>;
export declare const updateMediaSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["MOVIE", "TV_SHOW"]>>;
    director: z.ZodOptional<z.ZodString>;
    budget: z.ZodOptional<z.ZodNumber>;
    location: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodNumber>;
    year: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    imageUrl: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
}, "strip", z.ZodTypeAny, {
    type?: "MOVIE" | "TV_SHOW" | undefined;
    year?: number | undefined;
    title?: string | undefined;
    director?: string | undefined;
    budget?: number | undefined;
    location?: string | undefined;
    duration?: number | undefined;
    description?: string | undefined;
    imageUrl?: string | undefined;
}, {
    type?: "MOVIE" | "TV_SHOW" | undefined;
    year?: number | undefined;
    title?: string | undefined;
    director?: string | undefined;
    budget?: number | undefined;
    location?: string | undefined;
    duration?: number | undefined;
    description?: string | undefined;
    imageUrl?: string | undefined;
}>;
export declare const querySchema: z.ZodObject<{
    page: z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>;
    limit: z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>;
    search: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["MOVIE", "TV_SHOW"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    type?: "MOVIE" | "TV_SHOW" | undefined;
    search?: string | undefined;
}, {
    type?: "MOVIE" | "TV_SHOW" | undefined;
    page?: string | undefined;
    limit?: string | undefined;
    search?: string | undefined;
}>;
export type CreateMediaInput = z.infer<typeof createMediaSchema>;
export type UpdateMediaInput = z.infer<typeof updateMediaSchema>;
export type QueryInput = z.infer<typeof querySchema>;
//# sourceMappingURL=media_validator.d.ts.map