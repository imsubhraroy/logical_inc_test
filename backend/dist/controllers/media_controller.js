"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedia = exports.updateMedia = exports.createMedia = exports.getMediaById = exports.getAllMedia = void 0;
const client_1 = require("@prisma/client");
const media_validator_1 = require("../validators/media_validator");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const getAllMedia = async (req, res) => {
    try {
        const { page, limit, search, type } = media_validator_1.querySchema.parse(req.query);
        const skip = (page - 1) * limit;
        // Build where clause - only show user's own media
        const where = {
            userId: req.userId,
        };
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { director: { contains: search } },
            ];
        }
        if (type) {
            where.type = type;
        }
        const [media, total] = await Promise.all([
            prisma.media.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            prisma.media.count({ where }),
        ]);
        res.json({
            data: media,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasMore: skip + media.length < total,
            },
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        console.error("Error fetching media:", error);
        res.status(500).json({ error: "Failed to fetch media" });
    }
};
exports.getAllMedia = getAllMedia;
const getMediaById = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await prisma.media.findFirst({
            where: {
                id: parseInt(id),
                userId: req.userId, // Ensure user owns this media
            },
        });
        if (!media) {
            return res.status(404).json({ error: "Media not found" });
        }
        res.json(media);
    }
    catch (error) {
        console.error("Error fetching media:", error);
        res.status(500).json({ error: "Failed to fetch media" });
    }
};
exports.getMediaById = getMediaById;
const createMedia = async (req, res) => {
    try {
        const validatedData = media_validator_1.createMediaSchema.parse(req.body);
        const media = await prisma.media.create({
            data: {
                ...validatedData,
                imageUrl: validatedData.imageUrl || null,
                description: validatedData.description || null,
                userId: req.userId, // Associate with logged-in user
            },
        });
        res.status(201).json(media);
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        console.error("Error creating media:", error);
        res.status(500).json({ error: "Failed to create media" });
    }
};
exports.createMedia = createMedia;
const updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = media_validator_1.updateMediaSchema.parse(req.body);
        // Check if media exists and belongs to user
        const existingMedia = await prisma.media.findFirst({
            where: {
                id: parseInt(id),
                userId: req.userId,
            },
        });
        if (!existingMedia) {
            return res.status(404).json({ error: "Media not found" });
        }
        const media = await prisma.media.update({
            where: { id: parseInt(id) },
            data: validatedData,
        });
        res.json(media);
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        console.error("Error updating media:", error);
        res.status(500).json({ error: "Failed to update media" });
    }
};
exports.updateMedia = updateMedia;
const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if media exists and belongs to user
        const existingMedia = await prisma.media.findFirst({
            where: {
                id: parseInt(id),
                userId: req.userId,
            },
        });
        if (!existingMedia) {
            return res.status(404).json({ error: "Media not found" });
        }
        await prisma.media.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: "Media deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting media:", error);
        res.status(500).json({ error: "Failed to delete media" });
    }
};
exports.deleteMedia = deleteMedia;
//# sourceMappingURL=media_controller.js.map