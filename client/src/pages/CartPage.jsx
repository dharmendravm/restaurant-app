import { addToCartThunk, getCartThunk } from "@/redux/cartSlice";
import { Lock, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartPage = () => {
  const userId = useSelector((state) => state.auth.userId);
  console.log(userId);

  const { email } = useSelector((state) => state.auth);
  const isLoggedIn = !!email;

  const { cartItems, totalCartPrice, loading } = useSelector(
    (state) => state.cart
  );

  const dispach = useDispatch();

  useEffect(() => {
    console.log("USER ID ", userId);
    if (userId) {
      dispach(getCartThunk(userId));
    }
  }, [userId, dispach]);


  //  Guest user
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-card-bg border border-border shadow-sm">
          <Lock className="w-12 h-12 text-brand-main" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Login required</h2>
        <p className="text-gray-600 mb-6">
          Please login or create an account to use the cart.
        </p>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-2 bg-brand-main text-text-main rounded-xl"
          >
            Login
          </Link>

          <Link to="/register" className="px-6 py-2 border rounded-xl">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  //  Logged-in but cart empty
  if (!loading && cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 border border-orange-200 shadow-sm">
          <ShoppingBag className="w-12 h-12 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">
          Add items from the menu to get started
        </p>

        <Link to="/" className="px-6 py-2 bg-orange-500 text-white rounded-xl">
          Browse Menu
        </Link>
      </div>
    );
  }

  // Logged-in + cart has items
  return (
    <>
      {/* Cart Items List */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 p-4 border rounded-xl bg-card-bg shadow-sm"
          >
            {/* Item Image */}
            <div className="w-20 h-20 rounded-lg overflow-hidden border">
              <img
                src={item.menuItemId?.image}
                alt={item.menuItemId?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Item Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-text-accent">
                {item.menuItemId.name}
              </h3>

              <p className="text-sm text-text-main">₹ {item.menuItemId.price}</p>

              {/* Quantity Controls */}
              <div className="mt-2 flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg border text-lg font-semibold">
                  -
                </button>

                <span className="min-w-8 text-center font-medium">
                  {item.quantity}
                </span>
{/* //^^ */}
                <button
                  className="w-8 h-8 rounded-lg border text-lg font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="text-right space-y-2">
              {/* Line Total (price × qty) */}
              <p className="font-semibold text-text-main">
                ₹ {/* item total here */}
              </p>

              {/* Remove Button */}
              <button className="text-sm text-danger py-2 px-6 border border-danger rounded-2xl hover:bg-danger/5">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 p-5 border rounded-xl bg-card-bg space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Subtotal</span>
          <span className="font-medium">₹ {totalCartPrice}</span>
        </div>

        <div className="border-t pt-3 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹ {totalCartPrice}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-6 flex justify-end">
        <button className="px-6 py-3 rounded-xl bg-brand-main text-text-main font-semibold hover:bg-brand-main/80">
          Proceed to Checkout
        </button>
      </div>
    </>
  );
};
export default CartPage;
