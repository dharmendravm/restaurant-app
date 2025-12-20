import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import guestSlice from './guestSlice.js'
import menuReducer from './menuSlice.js'
import cartReducer from './cartSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    guest: guestSlice,
    menu : menuReducer,
    cart : cartReducer 
  },
});

export default store;
