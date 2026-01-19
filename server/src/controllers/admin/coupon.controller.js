import Coupon from "../../models/coupon.js";
import AppError from "../../utils/appError.js";

export const registerCoupon = async (req, res, next) => {
  try {
    const {
      couponCode,
      discountType,
      maxDiscount,
      validFrom,
      validTo,
      usageLimit,
      minOrderAmount,
      discountValue,
      description,
    } = req.body;

    if (!couponCode || !discountType || !discountValue) {
      return next(new AppError("Code and discountType are required", 400));
    }

    const existingCoupon = await Coupon.findOne({
      code: couponCode.toUpperCase(),
    });
    if (existingCoupon) {
      return next(new AppError("Coupon code already exists", 400));
    }

    const couponData = {
      code: couponCode.toUpperCase(),
      discountType,
      maxDiscount: maxDiscount || null,
      validFrom: validFrom || new Date(),
      validTo: validTo || null,

      usageLimit: usageLimit || null,
      minOrderAmount: minOrderAmount || 0,
      discountValue: discountValue || 0,

      description: description || "",
      isActive: true,
      usedCount: 0,
    };

    const savedCoupon = await new Coupon(couponData).save();

    res.status(201).json({
      message: "Coupon created successfully",
      coupan: savedCoupon,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find();

    if (!coupons.length) {
      return next(new AppError("No coupons found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Coupons fetched successfully",
      coupons,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleCouponIsActive = async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    coupon.isActive = !coupon.isActive;

    await coupon.save();

    res.json({ success: true, id: coupon._id, isActive: coupon.isActive });
  } catch (error) {
    next(error);
  }
};
