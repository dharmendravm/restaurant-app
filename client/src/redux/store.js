import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import guestSlice from './guestSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    guest: guestSlice,
  },
});

export default store;
