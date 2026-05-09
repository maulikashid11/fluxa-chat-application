import express from 'express';
import { getConversation, sendMessage } from '../controllers/messagesController.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post('/sendmessage',isAuthenticated,sendMessage);
router.post('/getconversation',isAuthenticated,getConversation);

export default router;