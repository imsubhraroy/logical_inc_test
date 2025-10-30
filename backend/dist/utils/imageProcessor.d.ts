export interface ProcessImageOptions {
    width?: number;
    height?: number;
    quality?: number;
}
/**
 * Process and optimize uploaded images
 * - Resize to appropriate dimensions
 * - Compress to reduce file size
 * - Convert to WebP format for better compression
 */
export declare function processImage(inputPath: string, options?: ProcessImageOptions): Promise<string>;
/**
 * Generate thumbnail for image
 */
export declare function generateThumbnail(inputPath: string, width?: number, height?: number): Promise<string>;
//# sourceMappingURL=imageProcessor.d.ts.map