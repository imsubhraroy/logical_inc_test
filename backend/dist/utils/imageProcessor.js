"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = processImage;
exports.generateThumbnail = generateThumbnail;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * Process and optimize uploaded images
 * - Resize to appropriate dimensions
 * - Compress to reduce file size
 * - Convert to WebP format for better compression
 */
async function processImage(inputPath, options = {}) {
    const { width = 500, // Default width for posters
    height = 750, // Default height for posters (2:3 aspect ratio)
    quality = 80 // Quality for compression
     } = options;
    try {
        // Generate output path with .webp extension
        const dir = path_1.default.dirname(inputPath);
        const basename = path_1.default.basename(inputPath, path_1.default.extname(inputPath));
        const outputPath = path_1.default.join(dir, `${basename}.webp`);
        // Process image with sharp
        await (0, sharp_1.default)(inputPath)
            .resize(width, height, {
            fit: 'cover',
            position: 'center'
        })
            .webp({ quality })
            .toFile(outputPath);
        // Delete original file if conversion successful
        if (inputPath !== outputPath && fs_1.default.existsSync(inputPath)) {
            fs_1.default.unlinkSync(inputPath);
        }
        return outputPath;
    }
    catch (error) {
        console.error('Error processing image:', error);
        // Return original path if processing fails
        return inputPath;
    }
}
/**
 * Generate thumbnail for image
 */
async function generateThumbnail(inputPath, width = 200, height = 300) {
    try {
        const dir = path_1.default.dirname(inputPath);
        const basename = path_1.default.basename(inputPath, path_1.default.extname(inputPath));
        const thumbPath = path_1.default.join(dir, `${basename}-thumb.webp`);
        await (0, sharp_1.default)(inputPath)
            .resize(width, height, {
            fit: 'cover',
            position: 'center'
        })
            .webp({ quality: 70 })
            .toFile(thumbPath);
        return thumbPath;
    }
    catch (error) {
        console.error('Error generating thumbnail:', error);
        return inputPath;
    }
}
//# sourceMappingURL=imageProcessor.js.map