import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { BrandLogo } from "@/layout/BrandLogo";

const Navbar = () => {
  return (
    <div className="flex justify-center w-full">
      <nav className="w-11/12 md:w-10/12 rounded-full bg-[#29250d] backdrop-blur-xl border border-[#f3e2d2] shadow-[0_14px_40px_rgba(0,0,0,0.08)] fixed top-1 z-50 px-5 md:px-7 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <BrandLogo />

          {/* Links */}
          <ul className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#e2ddd8]">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 rounded-full px-3 py-1.5 hover:bg-[#aca9a6] hover:text-[#fff6eb] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/menu"
                className="flex items-center gap-2 rounded-full px-3 py-1.5 hover:bg-[#cfc249] hover:text-[#fff6eb] transition-colors"
              >
                Menu
              </Link>
            </li>
          </ul>

          {/* Right CTA */}
          <div className="hidden md:flex">
            <Button />
          </div>

          {/* Mobile */}
          <button className="md:hidden text-[#1b130c] text-3xl">☰</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
