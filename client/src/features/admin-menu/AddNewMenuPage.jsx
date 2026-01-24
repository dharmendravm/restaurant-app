import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDish, clearMenuError } from "@/store/admin/menuSlice";
import MenuSection from "@/components/MenuSection";
import AuthError from "@/components/auth/AuthError";

const MenuPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.menu);

  const [form, setForm] = useState({
    dishName: "",
    price: "",
    category: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  const onChange = (e) => {
    if (error) dispatch(clearMenuError());
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateNewDish = async (e) => {
    e.preventDefault();

    // Prepare FormData
    const data = new FormData();
    data.append("name", form.dishName);
    data.append("price", form.price);
    data.append("description", form.description);
    data.append("category", form.category);
    if (image) data.append("image", image);

    const result = await dispatch(createDish(data));

    if (createDish.fulfilled.match(result)) {
      setForm({ dishName: "", price: "", category: "", description: "" });
      setImage(null);
      e.target.reset(); 
    }
  };

  const CATEGORY_OPTIONS = ["Appetizers", "Soups", "Main Courses", "Desserts", "Beverages"];

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <header className="mb-8">
          <p className="text-xs uppercase tracking-widest text-text-main">Admin / Menu</p>
          <h1 className="text-3xl font-semibold text-text-main">Add New Dish</h1>
          <p className="text-sm text-text-main mt-1">Create a new menu item visible to customers</p>
        </header>

        <form onSubmit={handleCreateNewDish}>
          <div className="bg-card-bg/40 border border-border rounded-xl shadow-sm p-6 space-y-6">
            <AuthError message={error} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text-main mb-1">Dish Name</label>
                <input
                  name="dishName"
                  value={form.dishName}
                  onChange={onChange}
                  placeholder="e.g. Paneer Butter Masala"
                  className="w-full text-text-main bg-transparent rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-brand-main/60"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-main mb-1">Price (₹)</label>
                <input
                  name="price"
                  value={form.price}
                  onChange={onChange}
                  placeholder="e.g. 249"
                  type="number"
                  className="w-full text-text-main bg-transparent rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-brand-main/60"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text-main mb-1">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={onChange}
                  required
                  className="w-full rounded-lg border border-border bg-card-bg/70 px-3 py-2.5 text-sm text-text-main focus:ring-2 focus:ring-brand-main/60 cursor-pointer"
                >
                  <option value="" disabled>Select category</option>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-main mb-1">Dish Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="block w-full text-sm text-text-main file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-btn-black/60 file:text-text-main hover:file:cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Short description about the dish"
                rows={4}
                className="w-full text-text-main bg-transparent rounded-lg border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-brand-main/60"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <button
                type="button"
                className="px-5 py-2 rounded-lg text-sm text-text-main hover:bg-brand-fade transition"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-brand-main text-white text-sm font-medium hover:bg-brand-main/90 transition disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Dish"}
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