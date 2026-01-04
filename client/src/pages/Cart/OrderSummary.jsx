export const OrderSummary = ({ totalprice }) => {
  
  const applicableCoupons = dummyCoupons.filter(
    (c) => c.isAvailableCoupon
  );
  const unavailableCoupons = dummyCoupons.filter(
    (c) => !c.isAvailableCoupon
  );

  return (
    <div className="lg:sticky lg:top-24 bg-card-bg/40 backdrop-blur border border-border rounded-3xl p-6 space-y-6 shadow-lg">
      <h3 className="text-lg font-semibold tracking-tight">
        Order Summary
      </h3>

      {/* Price Info */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-text-muted">Subtotal</span>
          <span>₹ {totalprice}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-muted">Taxes</span>
          <span>₹ 0</span>
        </div>
      </div>

      {/* Coupons Section */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold">
          Available Coupons
        </h4>

        {applicableCoupons.map((coupon) => (
          <div
            key={coupon._id}
            className="flex justify-between items-center p-3 rounded-xl bg-green-500/10 border border-green-500/20"
          >
            <div>
              <p className="text-sm font-semibold text-green-500">
                {coupon.couponCode}
              </p>
              <p className="text-xs text-text-muted">
                {coupon.description}
              </p>
            </div>

            <button className="text-xs font-semibold text-green-500 hover:underline">
              APPLY
            </button>
          </div>
        ))}

        {unavailableCoupons.length > 0 && (
          <>
            <h4 className="text-sm font-semibold text-text-muted">
              Not Applicable
            </h4>

            {unavailableCoupons.map((coupon) => (
              <div
                key={coupon._id}
                className="p-3 rounded-xl bg-muted/40 border border-border opacity-60"
              >
                <p className="text-sm font-semibold">
                  {coupon.couponCode}
                </p>
                <p className="text-xs text-text-muted">
                  {coupon.description}
                </p>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Total */}
      <div className="border-t border-border pt-4 flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-brand-main">
          ₹ {totalprice}
        </span>
      </div>

      <button className="w-full mt-4 py-3 rounded-2xl bg-brand-main text-black font-semibold hover:scale-[1.02] active:scale-95 transition">
        Proceed to Checkout
      </button>
    </div>
  );
};
const dummyCoupons = [
  {
    _id: "1",
    couponCode: "FIRST30",
    description: "30% off on first order",
    discountAmount: 150,
    isAvailableCoupon: true,
  },
  {
    _id: "2",
    couponCode: "FLAT100",
    description: "Flat ₹100 off on orders above ₹799",
    discountAmount: 100,
    isAvailableCoupon: true,
  },
  {
    _id: "3",
    couponCode: "BIGSAVE50",
    description: "50% off on orders above ₹2000",
    discountAmount: 0,
    isAvailableCoupon: false,
  },
];
