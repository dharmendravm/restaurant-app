import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

// 1. Fetch all coupons
export const fetchCoupons = createAsyncThunk("coupons/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("admin/coupons/all");
    return res.data.coupons;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch coupons");
  }
});

// 2. Toggle Status
export const toggleCouponStatus = createAsyncThunk("coupons/toggle", async (id, { rejectWithValue }) => {
  try {
    const res = await api.patch(`admin/coupons/${id}/toggle`);
    return { id, isActive: res.data.isActive };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to toggle status");
  }
});

// 3. Create Coupon (Naya Logic yahan hai)
export const createCoupon = createAsyncThunk("coupons/create", async (formData, { rejectWithValue }) => {
  try {
    const res = await api.post("admin/coupons/create", formData);
    return res.data.coupon; // Maan ke chal raha hoon backend naya coupon object bhej raha hai
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to create coupon");
  }
});

const couponSlice = createSlice({
  name: "coupons",
  initialState: { 
    items: [], 
    loading: false,      // Buttons/Actions ke liye
    pageLoading: false,  // Initial data fetch ke liye
    error: null 
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Coupons
      .addCase(fetchCoupons.pending, (state) => { 
        state.pageLoading = true; 
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.pageLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.pageLoading = false;
        state.error = action.payload;
      })

      // Create Coupon
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        // Naya coupon list mein sabse upar add ho jayega (Real-time update)
        state.items.unshift(action.payload); 
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle Status
      .addCase(toggleCouponStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleCouponStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(c => c._id === action.payload.id);
        if (index !== -1) {
          state.items[index].isActive = action.payload.isActive;
        }
      })
      .addCase(toggleCouponStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = couponSlice.actions;
export default couponSlice.reducer;