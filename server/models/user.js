import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  phone:{
    type: Number
  },
  email: {
    type: String,
  },
  role:{
    type: String,
    enum: ['custmer','admin'],
    default: 'custmer'
  },
  totolSpends: {
    type : Number
  },
  totalOrders: {
    type : Number
  },
  loyalPoints: {
    type : Number
  },
  passwordHash: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  referenceToken: {
    type: String,
  },
  referenceTokenExpiresTime: {
    type : Date
  },
  lastLogin:{
    type : Date,
    default: Date.now,
  }
});

const User = mongoose.model("User", UserSchema);
export default User;