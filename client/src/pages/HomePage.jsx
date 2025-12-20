import axios from "axios";
import React, { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";

const API_URL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  return (
    <div className="space-y-12 container mx-auto px-4">
      <HeroSection />

      {/* Signature dishes */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div className="flex flex-wrap gap-2 text-[11px]">
            <button className="rounded-full bg-brand-main px-3 py-1.5 text-white font-semibold">
              All
            </button>
            {/* Burger */}
            <button className="rounded-full bg-hover px-3 py-1.5 text-brand-main font-semibold border border-border">
              Burger
            </button>

            {/* Wraps */}
            <button className="rounded-full bg-hover px-3 py-1.5 text-text-main font-semibold border border-border">
              Wraps
            </button>

            {/* Pizza */}
            <button className="rounded-full bg-hover px-3 py-1.5 text-text-main font-semibold border border-border">
              Pizza
            </button>
          </div>
        </div>
        <MenuSection />
      </section>
    </div>
  );
};

export default HomePage;
// const handleClick = (menuItemId) => {
//   dispach(
//     addToCartThunk({
//       userId,
//       menuItemId,
//     })
//   );
// };onClick={() => handleClick(item.menuItemId._id)}
