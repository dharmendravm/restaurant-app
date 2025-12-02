import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Gift,
  Sparkles,
  Award,
  Percent,
  UserCheck,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { BrandLogo } from "../components/BrandLogo";
import { GoogleLoginUI } from "../components/GoogleUI";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center py-4 px-4 overflow-hidden">
      {/* glow */}
      <div className="absolute inset-0 -top-32 -right-28 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 -bottom-32 -left-28 w-96 h-96 bg-yellow-400/6 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative w-full max-w-6xl rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* LEFT  */}
          <div className="flex flex-col justify-center">
          <div className="bg-[rgba(255,255,255,0.02)] border border-white/6 backdrop-blur-xl rounded-2xl p-5 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            <div>
              {/* Logo */}
              <div className="mb-4">
                <BrandLogo />
              </div>

              <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Welcome Back
              </h1>
              <p className="text-gray-400 text-sm mt-2 max-w-lg">
                Sign in to access your premium rewards.
                <Gift
                  size={16}
                  className="inline ml-1 -translate-y-0.5 text-orange-300"
                />
              </p>

              {/* ERROR */}
              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* FORM */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* EMAIL */}
                <div>
                  <label className="text-xs text-gray-300 mb-2 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className="w-full pl-11 pr-3 py-2.5 bg-gray-900/50 border border-gray-800
                      rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none
                      focus:border-orange-300/40 focus:ring-1 focus:ring-orange-400/20
                      transition text-sm"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="text-xs text-gray-300 mb-2 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className="w-full pl-11 pr-3 py-2.5 bg-gray-900/50 border border-gray-800
                      rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none
                      focus:border-orange-300/40 focus:ring-1 focus:ring-orange-400/20
                      transition text-sm"
                    />
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full bg-amber-300 hover:bg-orange-500 text-black font-semibold 
                  py-3 rounded-lg shadow-lg shadow-orange-500/20 transition active:scale-95 
                  flex items-center justify-center gap-2"
                >
                  {loading ? (
                    "Signing in..."
                  ) : (
                    <>
                      <UserCheck className="w-5" />
                      Sign In
                    </>
                  )}
                </button>

                {/* GOOGLE LOGIN */}
                <GoogleLoginUI />

              </form>
              <div className="pt-2 text-center text-xs text-gray-500">
                <p>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-white font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Register <ArrowRight className="w-4" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
          </div>

          {/* right */}
          <aside className="flex flex-col justify-start gap-3 min-w-0">
            {/* Welcome Card */}
            <div className="bg-[rgba(255,255,255,0.03)] border border-white/6 backdrop-blur-md rounded-2xl px-6 p-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg shrink-0 bg-[rgba(255,159,28,0.12)] flex items-center justify-center">
                  <Sparkles className="text-orange-300" size={20} />
                </div>
                <div>
                  <h4 className="text-white text-lg font-semibold">
                    Welcome Back
                  </h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Continue earning and redeeming your points.
                  </p>
                </div>
              </div>
            </div>

            {/* Loyalty Program */}
            <div className="bg-[rgba(255,255,255,0.02)] border border-white/6 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                  <Award className="text-orange-300" /> Loyalty Program
                </h3>
                <span className="text-gray-400 text-xs">Member benefits</span>
              </div>

              <div className="grid gap-3">
                <Card title="Earn Points" value="1 Point = ₹1" />
                <Card title="Redeem Points" value="100 Points = ₹10" />
                <Card title="Bonus Points" value="+50 Points" />
              </div>
            </div>

            {/* Membership */}
            <div className="bg-[rgba(255,255,255,0.02)] border border-white/6 rounded-2xl px-6 p-2">
              <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <Percent className="text-orange-300" /> Membership Tiers
              </h4>
              <Tier title="Bronze" range="0-500 pts" offer="5% Discount" />
              <Tier title="Silver" range="501-2000 pts" offer="10% + Support" />
              <Tier title="Gold" range="2000+ pts" offer="15% + Exclusive" />
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-[rgba(255,255,255,0.02)] border border-white/6 rounded-lg p-3 flex items-center justify-between">
    <h4 className="text-gray-100 text-sm font-semibold">{title}</h4>
    <p className="text-gray-400 text-xs">{value}</p>
  </div>
);

const Tier = ({ title, range, offer }) => (
  <div className="bg-[rgba(0,0,0,0.25)] border border-gray-900 rounded-lg p-1 px-4 mb-3">
    <div className="flex items-center justify-between">
      <span className="text-gray-100 text-sm font-semibold">
        {title} Member
      </span>
      <span className="text-gray-400 text-xs">{range}</span>
    </div>
    <p className="text-gray-500 text-xs mt-2">{offer}</p>
  </div>
);

export default Login;
