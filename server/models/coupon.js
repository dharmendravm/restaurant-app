import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
  }, //name FIRST50
  discountType: {
    type: String,
    enum: ["percentage", "fixedAmount"], //dropdown percentage , fixed amount  20% Rs50
  },
  maxDiscount: {
    type: Number,
  }, //500
  validFrom: {
    type: Date,
  }, //ui
  validTo: {
    type: Date,
  }, //ui
  isActive: {
    type: Boolean,
    default: true,
  },
  isFirstOrder: {
    type: Boolean,
  }, //users => totalOrders =>
  usageLimit: {
    type: Number,
  }, //ui
  usedCount: {
    type: Number,
  }, //ui
  minOrderAmount: {
    type: Number, //1000
  }, //cart fetch > minOrderamount //plese add more item amount 1000 - 950  rs50
  discountValue: {
    type: Number,
  },
  description: {
    type: String,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
