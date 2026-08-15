import express from 'express';
import { getUsersForSidebar, searchUsers, updateProfile } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protectRoute);

router.get('/', getUsersForSidebar);
router.get('/search', searchUsers);
router.put('/profile', updateProfile);

export default router;
