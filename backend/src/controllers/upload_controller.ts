import { Response } from "express";
import { AuthRequest } from "../middleware/auth_middleware";
import { processImage } from "../utils/imageProcessor";
import path from "path";

export const uploadImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Process the uploaded image
    const processedPath = await processImage(req.file.path);

    // Generate URL for accessing the image
    const filename = path.basename(processedPath);
    const imageUrl = `/uploads/${filename}`;

    res.json({
      success: true,
      imageUrl,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

export const deleteUploadedImage = async (req: AuthRequest, res: Response) => {
  try {
    const { filename } = req.params;

    // Security check: only allow deleting files in uploads directory
    if (filename.includes("..") || filename.includes("/")) {
      return res.status(400).json({ error: "Invalid filename" });
    }

    const filePath = path.join(process.cwd(), "uploads", filename);
    const fs = require("fs");

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true, message: "Image deleted successfully" });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
};
