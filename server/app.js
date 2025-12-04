import express from "express";
import cors from "cors";
import "dotenv/config";
import ConnectDB from "./config/database.js";

import authRoutes from "./router/auth.route.js";
import tableRoute from "./router/table.route.js";
import menuRoute from "./router/menu.route.js";

const app = express();

// Middlewares
app.use(express.json());

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174"],
  })
);

// DB Connect
await ConnectDB();


// Base Route
app.get("/", (req, res) => {
  res.send("Server is Live");
});

// Api Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", tableRoute);
app.use("/api/v1", menuRoute);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Running on Port: ${PORT}`);
});
