import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice.js";
import guestSlice from '../redux/guestSlice.js';
import menuReducer from '../redux/menuSlice.js';
import cartReducer from '../redux/cartSlice.js';
import userReducer from '../redux/userSlice.js'

import tableReducer from '../redux/admin/tableSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    guest: guestSlice,
    user: userReducer,
    menu : menuReducer,
    cart : cartReducer,

    table : tableReducer
  },
});

export default store;
