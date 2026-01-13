import React, { useState } from "react";
import CouponsDashboard from "./CouponsDashboard";
import api from "@/lib/api";
import AuthError from "@/components/auth/AuthError";

const AddCouponPage = () => {
  const [form, setForm] = useState({
    couponCode: "",
    discountType: "",
    discountValue: "",
    maxDiscount: "",
    minOrderAmount: "",
    usageLimit: "",
    validFrom: "",
    validTo: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createCouponApi();
    console.log(form);
    
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createCouponApi = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      setLoading(true);
      setError(null);
      const res = await api.post("admin/coupons/create", form, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(res);
      
      setLoading(false);
    } catch (error) {
      console.log(error);
      
      setError(error.message || "Someting went wrong");
    }
  };
  return (
    <>
      <div className="min-h-screen bg-app-bg px-6 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <p className="text-xs uppercase tracking-widest text-text-muted">
              Admin / Coupons
            </p>
            <h1 className="text-3xl font-semibold text-text-main">
              Add New Coupon
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Create discount coupons for customer orders
            </p>
          </header>

          {/* Card */}
          <div className="bg-card-bg/50 border border-border rounded-2xl shadow-sm p-7 space-y-8">
            <AuthError message={error} />
            {/* Section 1 */}

            <form onSubmit={handleFormSubmit}>
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-text-main mb-4">
                  Coupon Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">
                      Coupon Code
                    </label>
                    <input
                      name="couponCode"
                      onChange={onChange}
                      type="text"
                      placeholder="SAVE50"
                      className="w-full uppercase tracking-wider rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-main/60"
                    />
                    <p className="text-xs text-text-muted mt-1">
                      Code will be applied in uppercase
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">
                      Discount Type
                    </label>
                    <select
                      name="discountType"
                      value={form.discountType}
                      onChange={onChange}
                      className="w-full rounded-xl border px-4 py-2.5 text-sm bg-card-bg focus:ring-2 focus:ring-brand-main/60"
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixedAmount">Flat Amount (₹)</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-text-main mb-4">
                  Discount Rules
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">
                      Discount Value
                    </label>
                    <input
                      name="discountValue"
                      onChange={onChange}
                      type="number"
                      placeholder="50"
                      className="w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-main/60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">
                      Max Discount
                    </label>
                    <input
                      name="maxDiscount"
                      onChange={onChange}
                      type="number"
                      placeholder="200"
                      className="w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-main/60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">
                      Minimum Order (₹)
                    </label>
                    <input
                      name="minOrderAmount"
                      onChange={onChange}
                      type="number"
                      placeholder="499"
                      className="w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-main/60"
                    />
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-text-main mb-4">
                  Usage & Validity
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">
                      Usage Limit
                    </label>
                    <input
                      name="usageLimit"
                      onChange={onChange}
                      type="number"
                      placeholder="100"
                      className="w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-main/60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">
                      Valid From
                    </label>
                    <input
                      name="validFrom"
                      onChange={onChange}
                      type="date"
                      className="w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-main/60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">
                      Valid To
                    </label>
                    <input
                      name="validTo"
                      onChange={onChange}
                      type="date"
                      className="w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-main/60"
                    />
                  </div>
                </div>
              </section>

              {/* Description */}
              <section>
                <label className="block text-sm font-medium text-text-main mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  onChange={onChange}
                  rows={3}
                  placeholder="Flat 50% off on orders above ₹499"
                  className="w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-brand-main/60"
                />
              </section>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-5 border-t">
                <button
                  type="button"
                  className="px-6 py-2 rounded-xl text-sm text-text-main hover:bg-brand-fade transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-2.5 rounded-xl text-sm font-medium text-white
                bg-linear-to-r from-brand-main to-orange-500 shadow-md cursor-pointer"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <CouponsDashboard />
    </>
  );
};

export default AddCouponPage;
