import axios from "axios";
import React, { useEffect } from "react";
import { MenuCard } from "@/components/ui/MenuCard";
import { Link } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;

const signatureDishes = [
  {
    id: 1,
    title: "Cheesy Veg Wrap",
    subtitle: "Loaded with fresh veggies, cheese & secret house sauce.",
    price: 249,
    badge: "Signature",
    image:
      "https://images.archanaskitchen.com/images/recipes/snack-recipes/roll-recipes-wraps-frankies/Vegetarian_Wrap_with_Olives_and_Cottage_Cheese_1_ab9d341a05.jpg",
  },
  {
    id: 2,
    title: "Classic Smash Burger",
    subtitle: "Grilled to perfection with caramelized onions.",
    price: 299,
    badge: "Best Seller",
    image:
      "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "Wood-Fired Margherita Pizza",
    subtitle: "San Marzano sauce, fresh basil, double mozzarella.",
    price: 399,
    badge: "Chef's Pick",
    image:
      "https://www.destinationitaly.com.au/cdn/shop/files/DI_S_Margherita_518_9f860864-36f6-4aa2-b6d1-573727f16cc5_1800x1800.jpg?v=1717383750",
  },
];

const HomePage = () => {
  useEffect(() => {
    axios.get(`${API_URL}/api/v1/menu`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.1fr] gap-10 items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-[#fff1d6] px-3 py-1 text-[11px] font-semibold text-[#8b3a1a] border border-[#f5d9aa] mb-3">
            <span className="text-lg">🍽️</span>
            Fresh • Fast • Made with Love
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1b130c] leading-tight mb-3">
            Savor the Taste of
            <br />
            <span className="text-[#f97316]">Perfection.</span>
          </h1>
          <p className="max-w-md text-sm text-[#7a6a5a] mb-5">
            Fresh ingredients, mouth-watering recipes and a passion for good
            food delivered to your table or ready for pick-up.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <button className="rounded-full bg-[#1b130c] px-6 py-2.5 text-sm font-semibold text-[#fff6eb] shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:bg-[#2b1c0f] active:scale-95 transition">
              Order Now
            </button>
            <Link to='/menu' className="text-xs font-semibold text-[#5f4a3a] underline-offset-4 hover:underline">
              View Menu
            </Link>
          </div>

          <p className="text-[11px] text-[#a08f7d]">
            ⭐ 4.8/5 rated by 2k+ happy diners
          </p>
        </div>

        {/* Hero image card */}
        <div className="rounded-4xl bg-[#fffdf8] border border-[#f1ded0] shadow-[0_22px_60px_rgba(0,0,0,0.12)] overflow-hidden">
          <div className="relative aspect-16/10 overflow-hidden">
            <img
              src="https://www.tasteofhome.com/wp-content/uploads/2024/07/Peanut-Butter-Burgers_EXPS_FT24_277131_JR_0709_6.jpg"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Signature dishes with reusable cards */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#1b130c]">
              Our Signature Dishes
            </h2>
            <p className="text-[12px] text-[#8b8278] max-w-md mt-1">
              From classic favorites to modern culinary creations, each dish is
              made with the freshest ingredients and an extra dash of love.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <button className="rounded-full bg-[#1b130c] px-3 py-1.5 text-[#fff6eb] font-semibold">
              All
            </button>
            <button className="rounded-full bg-[#fff1d6] px-3 py-1.5 text-[#8b3a1a] font-semibold border border-[#f5d9aa]">
              Burger
            </button>
            <button className="rounded-full bg-[#ffe5e5] px-3 py-1.5 text-[#b43434] font-semibold border border-[#f5c4c4]">
              Wraps
            </button>
            <button className="rounded-full bg-[#e7f6ff] px-3 py-1.5 text-[#2563eb] font-semibold border border-[#bfdbfe]">
              Pizza
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {signatureDishes.map((dish) => (
            <MenuCard key={dish.id} {...dish} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
