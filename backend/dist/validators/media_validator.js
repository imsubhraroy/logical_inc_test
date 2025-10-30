"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querySchema = exports.updateMediaSchema = exports.createMediaSchema = exports.MediaType = void 0;
const zod_1 = require("zod");
exports.MediaType = zod_1.z.enum(["MOVIE", "TV_SHOW"]);
exports.createMediaSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").max(255),
    type: exports.MediaType,
    director: zod_1.z.string().min(1, "Director is required").max(255),
    budget: zod_1.z.number().positive("Budget must be positive"),
    location: zod_1.z.string().min(1, "Location is required").max(255),
    duration: zod_1.z.number().int().positive("Duration must be a positive integer"),
    year: zod_1.z
        .number()
        .int()
        .min(1888, "Year must be 1888 or later")
        .max(new Date().getFullYear() + 5),
    description: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().url("Must be a valid URL").optional().or(zod_1.z.literal("")),
});
exports.updateMediaSchema = exports.createMediaSchema.partial();
exports.querySchema = zod_1.z.object({
    page: zod_1.z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val) : 1)),
    limit: zod_1.z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val) : 20)),
    search: zod_1.z.string().optional(),
    type: exports.MediaType.optional(),
});
//# sourceMappingURL=media_validator.js.map