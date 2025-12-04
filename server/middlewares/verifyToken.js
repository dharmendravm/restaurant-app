import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Verify Access Token
export const verifyToken = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      const userData = await User.findById(decoded.id).select("-password");

      console.log(userData);
      req.user = decoded;
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
