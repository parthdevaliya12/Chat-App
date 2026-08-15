import express from 'express';
import { getConversations, getMessages, sendMessage, editMessage, deleteMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protectRoute);

router.get('/conversations', getConversations);
router.get('/:id', getMessages);
router.post('/send/:id', sendMessage);
router.put('/edit/:id', editMessage);
router.delete('/delete/:id', deleteMessage);

export default router;
