import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { data } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  sessionToken: null,
  loading: false,
  error: null,
};

// Session
export const session = createAsyncThunk("/session", async (data, thunkApi) => {
  try {
    const res = await axios.post(`${API_URL}/api/v1/session`, data);

    return res.data;
  } catch (error) {
    console.log(error);
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});

const guestSlice = createSlice({
  name: "guest",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(session.pending, () => {})
      .addCase(session.fulfilled, (state, action) => {
        console.log(state.payload);

        state.sessionToken = action.payload.data.sessionToken;
        localStorage.setItem("sessionToken", action.payload.data.sessionToken);
      })
      .addCase(session.rejected, () => {});
  },
});

export default guestSlice.reducer;