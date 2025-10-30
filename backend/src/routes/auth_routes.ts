import { Router } from 'express';
import { signup, login, getMe } from '../controllers/auth_controller';
import { authenticate } from '../middleware/auth_middleware';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authenticate, getMe);

export default router;