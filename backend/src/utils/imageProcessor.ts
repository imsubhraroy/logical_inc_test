import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

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
export async function processImage(
  inputPath: string,
  options: ProcessImageOptions = {}
): Promise<string> {
  const {
    width = 500,    // Default width for posters
    height = 750,   // Default height for posters (2:3 aspect ratio)
    quality = 80    // Quality for compression
  } = options;

  try {
    // Generate output path with .webp extension
    const dir = path.dirname(inputPath);
    const basename = path.basename(inputPath, path.extname(inputPath));
    const outputPath = path.join(dir, `${basename}.webp`);

    // Process image with sharp
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality })
      .toFile(outputPath);

    // Delete original file if conversion successful
    if (inputPath !== outputPath && fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
    }

    return outputPath;
  } catch (error) {
    console.error('Error processing image:', error);
    // Return original path if processing fails
    return inputPath;
  }
}

/**
 * Generate thumbnail for image
 */
export async function generateThumbnail(
  inputPath: string,
  width: number = 200,
  height: number = 300
): Promise<string> {
  try {
    const dir = path.dirname(inputPath);
    const basename = path.basename(inputPath, path.extname(inputPath));
    const thumbPath = path.join(dir, `${basename}-thumb.webp`);

    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 70 })
      .toFile(thumbPath);

    return thumbPath;
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    return inputPath;
  }
}