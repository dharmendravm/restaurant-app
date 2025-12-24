import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import { useToast } from "@/components/ui/toast";
import {
  Menu as MenuIcon,
  X,
  User,
  LogOut,
  ChevronDown,
  Home,
  UtensilsCrossed,
  Shield,
  ShoppingCart,
  UserPlus,
} from "lucide-react";

import ThemeToggle from "@/components/shared/ThemeToggle";
import { BrandLogo } from "@/components/shared/BrandLogo";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { success, error } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      localStorage.clear();
      dispatch(logout());
      success("Logged out", "You have been signed out.");
      navigate("/login");
    } catch (err) {
      console.error("Error during logout:", err);
      error("Logout failed", "Please try again.");
    }
  };

  const displayName = user?.name || "Guest";
  const displayRole = user?.role || "customer";
  const displayEmail = user?.email || "No email";

  const scrollToMenu = () => {
    const el = document.getElementById("menu-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <header className="sticky top-0 z-40 flex justify-center w-full">
      <nav className="w-full md:w-full rounded-b-md bg-blend-color backdrop-blur-xl px-4 md:px-6 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2 sm:gap-3 group select-none">
            {/* Logo box */}
            <BrandLogo />

            {/* Text */}
            <div className="leading-tight">
              <h2 className="font-extrabold tracking-wide text-heading text-base sm:text-xl">
                TableOrbit
              </h2>

              <p className="uppercase tracking-widest text-[7px] sm:text-[9px] lg:text-[10px] text-subtitle">
                Restaurant Management
              </p>
            </div>
          </div>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-6 text-[12px] font-semibold">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 rounded-full px-3 py-1 text-text-main hover:bg-hover hover:text-brand-main transition"
              >
                <Home className="w-5 h-5 " />
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToMenu}
                className="flex items-center gap-2 rounded-full px-3 py-1 text-text-main hover:bg-hover hover:text-brand-main transition"
              >
                <UtensilsCrossed className="w-5 h-5" />
                Menu
              </Link>
            </li>

            {displayRole === "admin" && (
              <li>
                <Link
                  to="/admin/menu"
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-admin text-white"
                >
                  <Shield className="w-5 h-5" />
                  Admin
                </Link>
              </li>
            )}
          </ul>

          {/*Cart + theme + Profile + mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle  */}
            <div className="mr-2 flex justify-end">
              <ThemeToggle />
            </div>

            {/* Cart  */}
            <Link to="/user/cart" className="flex gap-6">
              <ShoppingCart className="text-text-main hover:text-brand-main transition" />
            </Link>

            {/* Mobile menu button */}
            <button
              className="cursor-pointer md:hidden text-text-main hover:text-brand-main transition-colors"
              onClick={() => setIsMobileOpen((p) => !p)}
              aria-label="Toggle navigation menu"
            >
              {isMobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>

            {/* Desktop profile dropdown */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsProfileOpen((p) => !p)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl bg-card-bg hover:bg-hover transition"
              >
                {/* Icon */}
                <div
                  className=" w-9 h-9 rounded-xl bg-card-bg border border-border flex items-center justify-center"
                >
                  <User className="w-4 h-4 text-text-muted" />
                </div>

                {/* Identity */}
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium text-text-main truncate">
                    {displayName}
                  </p>
                  <p className="text-[11px] text-text-muted truncate">
                    {displayRole}
                  </p>
                </div>

                {/* Arrow */}
                <ChevronDown
                  className={`ml-1 w-4 h-4 text-text-muted transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  />

                  <div className=" absolute right-0 mt-4 z-50 w-[260px] rounded-2xl border border-border bg-card-bg shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
                    <div className="px-4 pt-5 pb-4 text-center border-b border-border">
                      <div className=" mx-auto mb-3 w-10 h-10 rounded-full  bg-brand-main/15 text-brand-main flex items-center justify-center text-sm font-semibold ">
                        {displayName?.charAt(0)}
                      </div>

                      <p className="text-sm font-medium text-text-main truncate">
                        {displayName}
                      </p>
                      <p className="text-[11px] text-text-muted truncate">
                        {displayEmail}
                      </p>

                      <span className=" mt-2 inline-block text-[10px] uppercase tracking-wider text-brand-main ">
                        {displayRole}
                      </span>
                    </div>

                    {/* Menu */}
                    <div className="py-2">
                      {user?.role === "admin" || user?.role === "customer" ? (
                        <>
                          <MenuItem
                            icon={User}
                            label="Profile"
                            to="/user/profile"
                            active
                          />

                          <MenuItem icon={Shield} label="Account" />
                        </>
                      ) : (
                        <MenuItem
                          icon={UserPlus}
                          label="Register"
                          to="/register"
                          active
                        />
                      )}
                      <MenuItem icon={ShoppingCart} label="Orders" />
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-border mx-3 my-2" />

                    {(user?.role === "admin" || user?.role === "customer") && (
                      <div className="pb-2">
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-danger hover:bg-danger/10 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile nav panel */}
        {isMobileOpen && (
          <div className="md:hidden mt-3 border-t border-border pt-3 space-y-2 text-sm">
            <Link
              to="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2 rounded-full px-3 py-1 text-text-main hover:text-brand-main transition"
            >
              <Home className="w-5 h-5 " />
              Home
            </Link>

            <Link
              onClick={() => {
                scrollToMenu();
                setIsMobileOpen(false);
              }}
              className="flex items-center gap-2 rounded-full px-3 py-1 text-text-main hover:text-brand-main transition"
            >
              <UtensilsCrossed className="w-5 h-5 " />
              Menu
            </Link>

            {displayRole === "admin" && (
              <Link
                to="/admin/menu"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-app-bg text-text-main"
              >
                <Shield className="w-5 h-5 " />
                Admin
              </Link>
            )}

            <Link
              to="/user/profile"
              className="mt-1 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] text-text-main hover:bg-hover transition"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-1 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] text-danger hover:bg-hover transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

const MenuItem = ({ icon: Icon, label, to, active }) => {
  const base = "flex items-center gap-3 px-4 py-2 text-sm transition";

  const activeStyle = "bg-hover text-text-main relative";

  const inactiveStyle = "text-text-muted hover:bg-hover";

  const content = (
    <div className={`${base} ${active ? activeStyle : inactiveStyle}`}>
      {active && (
        <span className="absolute left-0 h-full w-[3px] bg-brand-main rounded-r" />
      )}
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
};
