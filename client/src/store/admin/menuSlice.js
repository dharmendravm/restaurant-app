import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

// Create Dish (Handled FormData here)
export const createDish = createAsyncThunk(
  "menu/createDish",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("admin/menu/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.menuItem;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create dish");
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState: { items: [], loading: false, error: null },
  reducers: {
    clearMenuError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDish.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload); 
      })
      .addCase(createDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMenuError } = menuSlice.actions;
export default menuSlice.reducer;