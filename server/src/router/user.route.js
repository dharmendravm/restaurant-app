import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { getUserByToken } from '../controllers/user.controller.js';

const router = express.Router();

// getTotalUsers
router.get('/get', verifyToken, getUserByToken);

export default router;