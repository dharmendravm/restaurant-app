import Coupon from "../../models/coupon.js";

export const registerCoupon = async (req, res, next) => {
  try {
    const {
      code,
      discountType,
      maxDiscount,
      validFrom,
      validTo,
      usageLimit,
      minOrderAmount,
      discountValue,
      description,
    } = req.body;

    if (!code || !discountType || !discountValue) {
      return next(new AppError("Code and discountType are required", 400));
    }

    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    const couponData = {
      code: code.toUpperCase(),
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
