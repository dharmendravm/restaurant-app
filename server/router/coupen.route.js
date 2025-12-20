import express from "express";
import { createCoupon } from "../controllers/coupenController.js";

const router = express.Router();

router.post("/create", createCoupon);

export default router;
