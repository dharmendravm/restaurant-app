import express from "express";
import { getAllCoupons, registerCoupon, toggleCouponIsActive } from "../../controllers/admin/coupon.controller.js";

const router = express.Router();

router.post("/create", registerCoupon);
router.get("/all", getAllCoupons);

router.patch("/:id/toggle", toggleCouponIsActive)

export default router;
