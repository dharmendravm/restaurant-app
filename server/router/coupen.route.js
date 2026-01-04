import express from "express";
import { getAllCouponsAndApply } from "../controllers/coupon.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/apply", verifyToken, getAllCouponsAndApply);

export default router;
