import { Router } from 'express';
import { uploadImage, deleteUploadedImage } from '../controllers/upload_controller';
import { authenticate } from '../middleware/auth_middleware';
import { upload } from '../middleware/upload_middleware';

const router = Router();

// All upload routes require authentication
router.use(authenticate);

// Upload single image
router.post('/', upload.single('image'), uploadImage);

// Delete uploaded image
router.delete('/:filename', deleteUploadedImage);

export default router;