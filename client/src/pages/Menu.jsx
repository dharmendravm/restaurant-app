import React, { useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import { MenuCard } from "@/components/ui/MenuCard";

const initialItems = [
  {
    id: 1,
    title: "Cheesy Veg Wrap",
    subtitle: "Loaded with fresh veggies, cheese & secret house sauce.",
    category: "Starters",
    price: 249,
    badge: "Signature",
    image:
      "https://images.archanaskitchen.com/images/recipes/snack-recipes/roll-recipes-wraps-frankies/Vegetarian_Wrap_with_Olives_and_Cottage_Cheese_1_ab9d341a05.jpg",
  },
  {
    id: 2,
    title: "Classic Smash Burger",
    subtitle: "Grilled to perfection with caramelized onions.",
    category: "Starters",
    price: 299,
    badge: "Best Seller",
    image:
      "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "Wood-Fired Margherita Pizza",
    subtitle: "San Marzano sauce, fresh basil, double mozzarella.",
    category: "Starters",
    price: 399,
    badge: "Chef's Pick",
    image:
      "https://www.destinationitaly.com.au/cdn/shop/files/DI_S_Margherita_518_9f860864-36f6-4aa2-b6d1-573727f16cc5_1800x1800.jpg?v=1717383750",
  },
  {
  id: 4,
  title: "Classic Veg Supreme Pizza",
  subtitle: "Loaded with onion, capsicum, olives & sweet corn.",
  category: "Starters",
  price: 349,
  badge: "Bestseller",
  image:
    "https://www.thursdaynightpizza.com/wp-content/uploads/2022/06/veggie-pizza-side-view-out-of-oven-720x480.png",
},
{
  id: 5,
  title: "Peri Peri Chicken Wings",
  subtitle: "Spicy grilled wings with peri peri glaze.",
  category: "Starters",
  price: 299,
  badge: "Spicy",
  image:
    "https://images.unsplash.com/photo-1606756790138-261d2b21cd75",
},
{
  id: 6,
  title: "Paneer Tikka Platter",
  subtitle: "Smoked cottage cheese with Indian spices.",
  category: "Starters",
  price: 279,
  badge: "Veg Special",
  image:
    "https://images.unsplash.com/photo-1628294895950-9805252327bc",
},
{
  id: 7,
  title: "Creamy Alfredo Pasta",
  subtitle: "White sauce pasta with garlic & parmesan.",
  category: "Main Course",
  price: 369,
  badge: "Popular",
  image:
    "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
},
{
  id: 8,
  title: "Cold Coffee with Ice Cream",
  subtitle: "Chilled coffee blend topped with vanilla scoop.",
  category: "Drinks",
  price: 199,
  badge: "New",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCURhas5-EcysLV3vjwoF2xOZK-vnzOAIUg&s",
},

];

const Menu = () => {
  const [items] = useState(initialItems);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-[#fff1d6] px-3 py-1 text-[11px] font-semibold text-[#8b3a1a] border border-[#f5d9aa] mb-2">
            <UtensilsCrossed className="w-3 h-3" /> Today&apos;s Menu
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b130c]">
            A Feast for Your Eyes
          </h1>
          <p className="text-[12px] text-[#8b8278] max-w-md mt-1">
            Explore our curated list of dishes, crafted for every mood – spicy,
            cheesy or sweet.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items.map((item) => (
          <MenuCard key={item.id} {...item} />
        ))}
      </section>
    </div>
  );
};

export default Menu;
