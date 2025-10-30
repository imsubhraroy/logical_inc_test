"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUploadedImage = exports.uploadImage = void 0;
const imageProcessor_1 = require("../utils/imageProcessor");
const path_1 = __importDefault(require("path"));
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        // Process the uploaded image
        const processedPath = await (0, imageProcessor_1.processImage)(req.file.path);
        // Generate URL for accessing the image
        const filename = path_1.default.basename(processedPath);
        const imageUrl = `/uploads/${filename}`;
        res.json({
            success: true,
            imageUrl,
            message: "Image uploaded successfully",
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to upload image" });
    }
};
exports.uploadImage = uploadImage;
const deleteUploadedImage = async (req, res) => {
    try {
        const { filename } = req.params;
        // Security check: only allow deleting files in uploads directory
        if (filename.includes("..") || filename.includes("/")) {
            return res.status(400).json({ error: "Invalid filename" });
        }
        const filePath = path_1.default.join(process.cwd(), "uploads", filename);
        const fs = require("fs");
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({ success: true, message: "Image deleted successfully" });
        }
        else {
            res.status(404).json({ error: "Image not found" });
        }
    }
    catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Failed to delete image" });
    }
};
exports.deleteUploadedImage = deleteUploadedImage;
//# sourceMappingURL=upload_controller.js.map