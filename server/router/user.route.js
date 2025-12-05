import express from 'express';
import { getTotalUsers } from '../controllers/user.controller';

const router = express.Router();

// getTotalUsers
router.post('/admin/all',verifyToken, checkRole(["admin"]), getTotalUsers);

logController("tableRoute loaded")
export default router;