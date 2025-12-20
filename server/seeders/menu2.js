import mongoose from "mongoose";
import Menu from "../models/menu.js";
import connectDB from "../config/database.js";

/* ---------------- IMAGE HELPER (SAFE & WORKING) ---------------- */

const imageByCategory = (category) => {
  const map = {
    Appetizers: "https://loremflickr.com/800/600/appetizer,food",
    Soups: "https://loremflickr.com/800/600/soup,food",
    "Main Courses": "https://loremflickr.com/800/600/indian,food",
    "Breads & Rotis": "https://loremflickr.com/800/600/naan,roti",
    Desserts: "https://loremflickr.com/800/600/dessert",
    Beverages: "https://loremflickr.com/800/600/drink,beverage",
  };

  return map[category] || "https://loremflickr.com/800/600/food";
};

/* ---------------- MENU DATA ---------------- */

const menuItems = [
  // Appetizers
  {
    name: "Paneer Tikka",
    description: "Grilled paneer cubes marinated with spices",
    price: 329,
    category: "Appetizers",
    isAvailable: true,
  },
  {
    name: "Vegetable Samosa",
    description: "Crispy fried pastry with spiced potato filling",
    price: 149,
    category: "Appetizers",
    isAvailable: true,
  },

  // Soups
  {
    name: "Tomato Soup",
    description: "Creamy tomato soup with herbs",
    price: 179,
    category: "Soups",
    isAvailable: true,
  },
  {
    name: "Sweet Corn Soup",
    description: "Sweet corn soup with vegetables",
    price: 189,
    category: "Soups",
    isAvailable: true,
  },

  // Main Courses
  {
    name: "Paneer Butter Masala",
    description: "Paneer in rich creamy tomato gravy",
    price: 399,
    category: "Main Courses",
    isAvailable: true,
  },
  {
    name: "Vegetable Biryani",
    description: "Aromatic basmati rice cooked with vegetables",
    price: 349,
    category: "Main Courses",
    isAvailable: true,
  },

  // Breads & Rotis
  {
    name: "Butter Naan",
    description: "Soft naan brushed with butter",
    price: 69,
    category: "Breads & Rotis",
    isAvailable: true,
  },
  {
    name: "Tandoori Roti",
    description: "Whole wheat bread cooked in tandoor",
    price: 59,
    category: "Breads & Rotis",
    isAvailable: true,
  },

  // Desserts
  {
    name: "Gulab Jamun",
    description: "Soft milk dumplings in sugar syrup",
    price: 149,
    category: "Desserts",
    isAvailable: true,
  },
  {
    name: "Chocolate Brownie",
    description: "Warm chocolate brownie",
    price: 229,
    category: "Desserts",
    isAvailable: true,
  },

  // Beverages
  {
    name: "Masala Chai",
    description: "Indian spiced tea with milk",
    price: 89,
    category: "Beverages",
    isAvailable: true,
  },
  {
    name: "Fresh Lime Soda",
    description: "Refreshing lime soda",
    price: 99,
    category: "Beverages",
    isAvailable: true,
  },
];

/* ---------------- SEED SCRIPT ---------------- */

const seedMenu = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected");

    // Clean only menu collection
    await Menu.deleteMany({});
    console.log("🗑️ Existing menu cleared");

    // Attach images automatically
    const finalMenu = menuItems.map((item) => ({
      ...item,
      image: imageByCategory(item.category),
    }));

    const inserted = await Menu.insertMany(finalMenu);
    console.log(`🍽️ Seeded ${inserted.length} menu items`);

    await mongoose.connection.close();
    console.log("🔒 Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedMenu();
