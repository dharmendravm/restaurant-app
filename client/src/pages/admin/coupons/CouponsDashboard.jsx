import AuthError from "@/components/auth/AuthError";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import { is } from "zod/v4/locales";

const CouponsDashboard = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coupons, setCoupons] = useState([]);

  const getCouponsApi = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      setPageLoading(true);
      setError(null);
      const res = await api.get("admin/coupons/all", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setCoupons(res.data.coupons);

      setPageLoading(false);
    } catch (error) {
      setError(error.message || "Someting went wrong");
    }
  };
  const handleToggle = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCouponisActive(id);
  };

  const toggleCouponisActive = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      setLoading(true);
      setError(null);
      const res = await api.patch(
        `admin/coupons/${id}/toggle`,
        {}, // no body
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon._id === id
            ? { ...coupon, isActive: res.data.isActive }
            : coupon
        )
      );

      setLoading(false);
    } catch (error) {
      setError(error.message || "Someting went wrong");
    }
  };

  useEffect(() => {
    getCouponsApi();
  }, []);

  if (pageLoading) return <p>loading...</p>;
  return (
    <div className="min-h-screen bg-app-bg px-6 py-10">
      {console.log(coupons)}
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-semibold text-text-main">
            Coupons Overview
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Manage active and inactive discount coupons
          </p>
          <AuthError message={error} />
        </header>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Total */}
          <div className="rounded-2xl border border-border bg-card-bg/60 p-6">
            <p className="text-sm text-text-muted">Total Coupons</p>
            <h3 className="text-3xl font-bold text-text-main mt-2">24</h3>
          </div>

          {/* Active */}
          <div className="rounded-2xl border border-border bg-card-bg/60 p-6">
            <p className="text-sm text-text-muted">Active Coupons</p>
            <h3 className="text-3xl font-bold text-success mt-2">16</h3>
          </div>

          {/* Inactive */}
          <div className="rounded-2xl border border-border bg-card-bg/60 p-6">
            <p className="text-sm text-text-muted">Inactive Coupons</p>
            <h3 className="text-3xl font-bold text-danger mt-2">8</h3>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-card-bg/60 border border-border rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="font-semibold text-text-main">All Coupons</h2>

            {/* Filter Placeholder */}
            <select className="rounded-lg border px-3 py-1.5 text-sm bg-card-bg text-text-main">
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted-bg text-text-muted">
                <tr>
                  <th className="text-left px-6 py-3">Code</th>
                  <th className="text-left px-6 py-3">Type</th>
                  <th className="text-left px-6 py-3">Value</th>
                  <th className="text-left px-6 py-3">Usage</th>
                  <th className="text-left px-6 py-3">Status</th>
                  <th className="text-right px-6 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {coupons.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-text-muted"
                    >
                      No coupons found
                    </td>
                  </tr>
                ) : (
                  coupons.map((coupon) => (
                    <tr
                      key={coupon._id}
                      className="border-t hover:bg-hover transition"
                    >
                      <td className="px-6 py-4 font-medium text-text-main">
                        {coupon.code}
                      </td>
                      <td className="px-6 py-4 text-text-muted">
                        {coupon.discountType}
                      </td>
                      {coupon.discountType === "percentage" ? (
                        <td className="px-6 py-4 text-text-muted">
                          {`${coupon.discountValue} %`}
                        </td>
                      ) : (
                        <td className="px-6 py-4 text-text-muted">
                          {`₹ ${coupon.discountValue}`}
                        </td>
                      )}
                      <td className="px-6 py-4 text-text-muted">
                        {coupon.usedCount} / {coupon.usageLimit}
                      </td>
                      <td className="px-2">
                        <input
                          type="checkbox"
                          disabled={loading}
                          checked={coupon.isActive}
                          onChange={(e) => {
                            handleToggle(e, coupon._id);
                          }}
                          className="toggle toggle-sm bg-danger border border-danger [--tglbg:white] checked:bg-(--color-admin) checked:border-(--color-admin) transition-all duration-300 ease-out hover:scale-[1.04] active:scale-95 checked:shadow-[0_0_0_3px_rgba(34,197,94,0.25)] shadow-[0_0_0_3px_rgba(239,68,68,0.20)] "
                        />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-sm text-brand-main hover:underline">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponsDashboard;
