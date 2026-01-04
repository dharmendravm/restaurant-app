import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
  },
  accountType: {
    type: String,
    enum: ["REGISTERED", "GUEST"],
    default: "REGISTERED",
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
  totalSpends: {
    type: Number,
    default: 0,
  },
  loyalPoints: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  refreshToken: {
    type: String,
  },
  refreshTokenExpiresAt: {
    type: Date,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
