import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "@/store/orderSlice";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [orderId, dispatch]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading order…
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );

  if (!order)
    return (
      <p className="text-center mt-10 text-gray-500">
        Order not found
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-card-bg rounded-lg shadow">

      <h2 className="text-2xl font-semibold mb-6">
        Order Details
      </h2>

      {/* Order Info */}
      <div className="space-y-2 mb-6">
        <p><span className="font-medium">Order Number:</span> {order.orderNumber}</p>
        <p><span className="font-medium">Order Status:</span> {order.orderStatus}</p>
        <p><span className="font-medium">Payment Status:</span> {order.paymentStatus}</p>
        <p><span className="font-medium">Payment Method:</span> {order.paymentMethod}</p>
        <p><span className="font-medium">Table Number:</span> {order.tableNumber}</p>
      </div>

      <hr className="my-6" />

      {/* Items */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Items</h3>

        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between bg-card-bg p-3 rounded"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ₹ {item.price} x {item.quantity}
                </p>
              </div>
              <p className="font-medium">₹ {item.subTotal}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-6" />

      {/* Bill Summary */}
      <div className="space-y-2 mb-6">
        <h3 className="text-lg font-semibold">Bill Summary</h3>
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>₹ {order.subTotal}</span>
        </p>
        <p className="flex justify-between">
          <span>Discount</span>
          <span>₹ {order.discountAmount}</span>
        </p>
        <p className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹ {order.finalAmount}</span>
        </p>
      </div>

      <hr className="my-6" />

      {/* Customer Info */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Customer Info</h3>
        <p><span className="font-medium">Name:</span> {order.customerName || "-"}</p>
        <p><span className="font-medium">Email:</span> {order.customerEmail || "-"}</p>
        <p><span className="font-medium">Phone:</span> {order.customerPhone || "-"}</p>
      </div>

    </div>
  );
};

export default OrderDetails;
