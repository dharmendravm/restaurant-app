import jwt from "jsonwebtoken";
import User from "../models/user.js";

const checkGuestOrUser = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch {
      return next();
    }

    const user = await User.findById(decoded.id).select(
      "-password -refreshToken"
    );

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
export default checkGuestOrUser;
