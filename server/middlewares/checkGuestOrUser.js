import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config.js";
import User from "../models/user.js";

const checkGuestOrUser = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
      const userData = await User.findById(decoded.id).select(
        "-password -refreshToken"
      );
      console.log(userData);
      req.user = userData;
      next();
    } else {
      next();
    }
  } catch (error) {
    next(error)
  }
};
export default checkGuestOrUser;
