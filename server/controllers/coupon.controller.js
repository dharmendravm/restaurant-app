import Coupon from "../models/coupon.js";
import Cart from "../models/cart.js";
import { calculateCouponForCart } from "../utils/couponCalculator.js";
import AppError from "../utils/appError.js";

export const getAllCouponsAndApply = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return next(new AppError("Cart not found", 404));
    }

    let totalCartPrice = cart.totalCartPrice;
    let currentDate = new Date();

    const allCoupons = await Coupon.find({ isActive: true });

    const CouponsAfterCalculation = allCoupons.map((coupon) => {
      return calculateCouponForCart({
        coupon,
        totalCartPrice,
        userTotalOrders: req.user.totalOrders,
        currentDate
      })
    });

    res.status(200).json({
      totalCartPrice,
      CouponsAfterCalculation,
    });
  } catch (error) {
    next(error);
  }
};
