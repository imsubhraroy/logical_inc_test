import { Router } from 'express';
import {
  getAllMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia
} from '../controllers/media_controller';
import { authenticate } from '../middleware/auth_middleware';

const router = Router();

// All media routes are protected - require authentication
router.use(authenticate);

router.get('/', getAllMedia);
router.get('/:id', getMediaById);
router.post('/', createMedia);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

export default router;