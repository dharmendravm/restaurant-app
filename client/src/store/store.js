import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import guestSlice from "./guestSlice.js";
import menuReducer from "./menuSlice.js";
import cartReducer from "./cartSlice.js";
import userReducer from "./userSlice.js";
import couponReducer from "./couponSlice.js";
import orderReducer from "@/store/orderSlice.js";

import tableReducer from "./admin/tableSlice.js";
import adminUserReducer from "@/store/admin/userSlice.js";
import adminOrdersReducer from "@/store/admin/adminOrderSlice.js";
import adminCouponReducer from "@/store/admin/couponSlice.js"
const store = configureStore({
  reducer: {
    auth: authReducer,
    guest: guestSlice,
    user: userReducer,
    menu: menuReducer,
    cart: cartReducer,
    coupon: couponReducer,
    order: orderReducer,

    table: tableReducer,
    adminCoupons: adminCouponReducer,
    adminUsers: adminUserReducer,
    adminOrders: adminOrdersReducer,
  },
});

export default store;
