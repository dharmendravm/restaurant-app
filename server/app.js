import express from "express";
import cors from "cors";
import "./globallogs.js";
import { PORT, FRONTEND_URL, NODE_ENV } from "./config.js";
import ConnectDB from "./config/database.js";

import adminMenuRoutes from "./router/admin/menu.route.js";
import adminCouponRoutes from "./router/admin/coupon.route.js";
import adminUserRoutes from "./router/admin/user.route.js";
import adminTableRoutes from "./router/admin/table.route.js";

import authRoutes from "./router/auth.route.js";
import userRoute from "./router/user.route.js";
import sessionRoute from "./router/session.route.js";
import tableRoute from "./router/table.route.js";
import menuRoutes from "./router/menu.route.js";
import orderRoute from "./router/order.route.js";
import cartRoute from "./router/cart.route.js";
import couponRoute from "./router/coupen.route.js";
import { globalErrorHandler, notFound } from "./middlewares/errormiddleware.js";

const app = express();

// Middlewares
app.use(express.json());

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://192.168.1.5:5173",
];

if (FRONTEND_URL) {
  allowedOrigins.push(FRONTEND_URL);
}

app.use(
  cors({
    origin(origin, callback) {
      // allow non-browser / same-origin requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (NODE_ENV === "development") {
        console.warn("[CORS] Blocked origin:", origin);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// DB Connect
await ConnectDB();

// Base Route
app.get("/", (req, res) => {
  res.send("Server is Live");
});

// Admin Routes
app.use("/api/v1/admin/users", adminUserRoutes);
app.use("/api/v1/admin/coupons", adminCouponRoutes);
app.use("/api/v1/admin/menu", adminMenuRoutes);
app.use("/api/v1/admin/tables", adminTableRoutes);

// Api Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", sessionRoute);
app.use("/api/v1/tables", tableRoute);
app.use("/api/v1", menuRoutes);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/coupons", couponRoute);

// User Routes
// app.use("/api/v1", getTotalUsers);

// 404 Handler
app.use(notFound);

// Galobal Error Handler
app.use(globalErrorHandler);

// Export Express app for serverless (Vercel)
export default app;

// Start HTTP server only in non-Vercel (local/dev) environments
if (!process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is Running on Port: ${PORT}"`);
  });
}
