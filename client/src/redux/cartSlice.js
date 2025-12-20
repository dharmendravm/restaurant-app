import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Get Cart
export const getCartThunk = createAsyncThunk(
  "cart/getCart",
  async (userId, thunkApi) => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/cart/${userId}`);
      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

//  Add To Cart
export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, menuItemId, quantity }, thunkApi) => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/cart/add`, {
        userId,
        menuItemId,
        quantity,
      });

      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);
//  Incrase Cart item
export const increaseQtyCartThunk = createAsyncThunk(
  "cart/increase",
  async ({ userId, menuItemId, quantity }, thunkApi) => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/cart/increase`, {
        userId,
        menuItemId,
        quantity,
      });

      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);
export const decreaseQtyCartThunk = createAsyncThunk(
  "cart/decrease",
  async ({ userId, menuItemId, quantity }, thunkApi) => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/cart/decrease`, {
        userId,
        menuItemId,
        quantity,
      });

      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);
export const removeToCartThunk = createAsyncThunk(
  "cart/removeToCart",
  async ({ userId, menuItemId, quantity }, thunkApi) => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/cart/add`, {
        userId,
        menuItemId,
        quantity,
      });

      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);

//  Slice

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalCartPrice: 0,
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder

      // Get Cart
      .addCase(getCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items;
        state.totalCartPrice = action.payload.totalCartPrice;

        console.log("get cart action.payload", action.payload.items);
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add To Cart
      .addCase(addToCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items;
         state.totalCartPrice = action.payload.totalCartPrice;
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // increaseQty
      .addCase(increaseQtyCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(increaseQtyCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items;
        state.totalCartPrice = action.payload.totalCartPrice;
      })

      .addCase(increaseQtyCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // decreaseQty
      .addCase(decreaseQtyCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(decreaseQtyCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items;
        state.totalCartPrice = action.payload.totalCartPrice;
      })

      .addCase(decreaseQtyCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default cartSlice.reducer;
