import MenuSection from "@/components/MenuSection";
import api from "@/lib/api";
import React, { useState } from "react";

const MenuPage = () => {
  const [form, setForm] = useState({
    dishName: "",
    price: "",
    category: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateNewDish = async (e) => {
    e.preventDefault();
    createMenuApi();
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createMenuApi = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const data = new FormData();
      data.append("name", form.dishName);
      data.append("price", form.price);
      data.append("description", form.description);
      data.append("category", form.category);
      data.append("image", image);

      setLoading(true);
      setError(null);

      await api.post("admin/menu/create", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message || "Failed to create menu item");
    }
  };

  const CATEGORY_OPTIONS = [
    "Appetizers",
    "Soups",
    "Main Courses",
    "Desserts",
    "Beverages",
  ];

  if (error) return <p className="text-xs text-danger">{error}</p>;
  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="mb-8">
          <p className="text-xs uppercase tracking-widest text-text-main">
            Admin / Menu
          </p>
          <h1 className="text-3xl font-semibold text-text-main">
            Add New Dish
          </h1>
          <p className="text-sm  text-text-main mt-1">
            Create a new menu item visible to customers
          </p>
        </header>
        <form onSubmit={handleCreateNewDish}>
          <div className="bg-card-bg/40 border rounded-xl shadow-sm p-6 space-y-6">
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Dish Name */}
              <div>
                <label className="block text-sm font-medium  text-text-main mb-1">
                  Dish Name
                </label>
                <input
                  name="dishName"
                  onChange={onChange}
                  placeholder="e.g. Paneer Butter Masala"
                  className="w-full text-text-muted rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-main/60"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium  text-text-main mb-1">
                  Price (₹)
                </label>
                <input
                  name="price"
                  onChange={onChange}
                  placeholder="e.g. 249"
                  type="number"
                  className="w-full text-text-muted rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-main/60"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* catogary */}
              <div>
                <label className="block text-sm font-medium text-text-main mb-1">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={onChange}
                  required
                  className="w-full appearance-none rounded-lg border border-border bg-card-bg/70 px-3 py-2.5  text-sm text-text-main shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-main/60 focus:border-brand-main cursor-pointer"
                >
                  <option value="" disabled className="text-text-muted">
                    Select category
                  </option>

                  {CATEGORY_OPTIONS.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                      className=" text-text-main bg-card-bg"
                    >
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium  text-text-main mb-1">
                  Dish Image
                </label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className=" block w-full text-sm  text-text-main file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-btn-black/60 file:text-text-main hover:file:cursor-pointer"
                />
                <p className="text-xs text-text-muted mt-1">
                  JPG, PNG up to 2MB
                </p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">
                Description
              </label>
              <textarea
                name="description"
                onChange={onChange}
                placeholder="Short description about the dish"
                rows={4}
                className="w-full text-text-muted rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-main/60"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                className="px-5 py-2 rounded-lg text-sm text-text-main hover:bg-brand-fade transition"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                type="submit"
                className="
              px-6 py-2.5 rounded-lg
              bg-brand-main/80 text-white text-sm font-medium
              hover:bg-brand-main transition
            "
              >
                Add Dish
              </button>
            </div>
          </div>
        </form>
      </div>

      <MenuSection isAdmin={true} />
    </>
  );
};

export default MenuPage;
