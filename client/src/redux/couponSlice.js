// import api from "@/lib/api";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const API_URL = import.meta.env.VITE_API_URL;

// export const requireAuthToken = (thunkApi) => {
//   const token = thunkApi.getState().auth.accessToken;
//   if (!token) throw new Error("Not authenticated");
//   return token;
// };

// export const getAllCouponsThunk = createAsyncThunk(
//   "/coupons/all",
//   async (_, thunkApi) => {
//     try {
//       const accessToken = requireAuthToken(thunkApi);

//       const res = await api.get(`${API_URL}/api/v1/coupons/get`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       return res.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(
//         error.message || "Faild to fetch coupons"
//       );
//     }
//   }
// );

// const couponSlice = createSlice({
//   name: "coupon",
//   initialState: {
//     coupon: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllCouponsThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllCouponsThunk.fulfilled, (state, action) => {
//         state.coupon = action.payload;
//         state.loading = false;
//       })
//       .addCase(getAllCouponsThunk, (state, action)=>{
//         state.error = action.payload;
//         state.loading = false
//       })
//   },
// });
