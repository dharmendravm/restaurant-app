import express from 'express';
import { createOrder } from '../controllers/order.controller.js';
import checkGuestOrUser from '../middlewares/checkGuestOrUser.js'

const router = express.Router();

router.post('/place-order', checkGuestOrUser, createOrder)

export default router;