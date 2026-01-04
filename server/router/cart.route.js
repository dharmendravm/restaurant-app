import express from "express";
import {
  addToCart,
  clearCart,
  decreaseQty,
  getCart,
  increaseQty,
  removeItem,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.patch("/increase", verifyToken, increaseQty);
router.patch("/decrease", verifyToken, decreaseQty);
router.delete("/remove", verifyToken, removeItem);
router.delete("/clear", verifyToken, clearCart);

export default router;
