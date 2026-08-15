import express from 'express';
import { register, login, logout, checkAuth, updateSettings, deleteAccount } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check', protectRoute, checkAuth);
router.put('/settings', protectRoute, updateSettings);
router.delete('/account', protectRoute, deleteAccount);

export default router;
