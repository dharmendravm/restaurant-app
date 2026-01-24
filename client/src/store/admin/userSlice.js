import api from "@/lib/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAdminUsers = createAsyncThunk(
  "/admin/fetchUsers",
  async (_, thunkApi) => {
    try {
      const res = await api.get(
        "http://localhost:3000/api/v1/admin/users/all");
      return res.data.users;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

const adminUserSlice = createSlice({
  name: "adminUsers",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        console.log("data", action.payload);
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default adminUserSlice.reducer;
