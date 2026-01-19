import User from "../models/user.js";
import Cart from "../models/cart.js";

export const postOrderCleanUP = async ({ userId, finalAmount }) => {
  if (!userId) return;

  await User.findByIdAndUpdate(userId, {
    $inc: {
      totalOrders: 1,
      totalSpends: finalAmount,
    },
  });

  const cart = await Cart.findOne({ userId });
  if (cart) {
    cart.items = [];
    cart.totalCartPrice = 0;
    await cart.save();
  }
};
