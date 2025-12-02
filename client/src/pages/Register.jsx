import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  UserPlus,
  ArrowRight,
  UtensilsCrossed,
  Gift,
  Award,
  Percent,
  Sparkles,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { BrandLogo } from "../components/BrandLogo";
// import { register } from '../redux/authSlice';

const Register = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    dispatch(register(formData));
  };

  return (
<div className="min-h-screen bg-[#080808] flex items-center justify-center py-4 px-4  overflow-hidden">
      
      <div className="absolute inset-0 -top-32 -right-28 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute  overflow-hidden -bottom-32 -left-28 w-96 h-96 bg-yellow-400/6 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative w-full max-w-6xl rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch overflow-hidden">
          {/* left */}

          <div className="flex flex-col">
          <div className="bg-[rgba(255,255,255,0.02)] border border-white/6 backdrop-blur-xl rounded-2xl p-5 px-6 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            <div>

              <div className="mb-4">
                <BrandLogo />
              </div>

              <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Create Account
              </h1>
              <p className="text-gray-400 text-sm mt-2 max-w-lg">
                Join FlavorFusion & unlock premium restaurant rewards.
                <Sparkles
                  size={16}
                  className="inline ml-1 -translate-y-0.5 text-orange-300"
                />
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-300 mb-2 block">
                      Full name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className="w-full pl-11 pr-3 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-orange-300/40 focus:ring-1 focus:ring-orange-400/20 transition-all duration-200 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 mb-2 block">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-11 pr-3 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-orange-300/40 focus:ring-1 focus:ring-orange-400/20 transition-all duration-200 text-sm"
                        placeholder="you@gmail.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-300 mb-2 block">
                      Phone number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter Mobail"
                        maxLength="15"
                        className="w-full pl-11 pr-3 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-orange-300/40 focus:ring-1 focus:ring-orange-400/20 transition-all duration-200 text-sm"
                      />
                    </div>
                  </div>

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
                        placeholder="At least 6 characters"
                        className="w-full pl-11 pr-3 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-orange-300/40 focus:ring-1 focus:ring-orange-400/20 transition-all duration-200 text-sm"
                      />
                    </div>
                    <p className="text-gray-500 text-[11px] mt-2">
                      Min. 6 characters
                    </p>
                  </div>
                </div>


                <div>
                  <label className="text-xs text-gray-300 mb-2 block">
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      placeholder="Confirm password"
                      className="w-full pl-11 pr-3 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-orange-300/40 focus:ring-1 focus:ring-orange-400/20 transition-all duration-200 text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-orange-400 mt-1"
                  />
                  <p className="text-gray-400 text-xs">
                    I agree to the{" "}
                    <span className="text-orange-300 underline">Terms</span> &{" "}
                    <span className="text-orange-300 underline">
                      Privacy Policy
                    </span>
                  </p>
                </div>


                <button
                  type="submit"
                  className="w-full bg-amber-300 hover:bg-orange-500 text-black font-semibold 
                py-3 rounded-lg shadow-lg shadow-orange-500/20 transition delay-150 duration-300 ease-in-out active:scale-95 
                flex items-center justify-center gap-2"
                >
                  Register
                </button>
              </form>
            </div>


            <div className="pt-2 text-center text-xs text-gray-500">
              <p>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-white font-medium hover:underline inline-flex items-center gap-1"
                >
                  Sign in <ArrowRight className="w-4" />
                </Link>
              </p>
            </div>
          </div>
          </div>

          {/* right*/}
          <aside className="flex flex-col justify-start gap-3">
            {/* welcome card */}
            <div className="bg-[#ffffff08] border border-white/6 backdrop-blur-md rounded-2xl px-6 p-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg shrink-0 bg-[rgba(255,159,28,0.12)] flex items-center justify-center">
                  <Sparkles className="text-orange-300" size={20} />
                </div>
                <div>
                  <h4 className="text-white text-lg font-semibold">
                    Welcome Bonus
                  </h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Enjoy <span className="font-semibold">20% off</span> on your
                    first order.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#ffffff05] border border-white/6 rounded-2xl p-6">
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


            <div className="bg-[#ffffff05] border border-white/6 rounded-2xl px-6 p-2">
              <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-1.5">
                <Percent className="text-orange-300" /> Membership Tiers
              </h4>
              <Tier title="Bronze" range="0-500 pts" offer="5% Discount"/>
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
  <div className="bg-[#00000040] border border-gray-900 rounded-lg p-1.5 px-4 mb-2">
    <div className="flex items-center justify-between">
      <span className="text-gray-100 text-sm font-semibold">
        {title} Member
      </span>
      <span className="text-gray-400 text-xs">{range}</span>
    </div>
    <p className="text-gray-500 text-xs mt-1">{offer}</p>
  </div>
);

export default Register;
