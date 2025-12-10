import jwt from "jsonwebtoken";
import User from "../models/authUser.model.js"; 

export const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from headers or cookies
    let token =
      req.headers["authorization"]?.replace("Bearer ", "") ||
      req.cookies?.token ||
      null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Unauthorized access.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Unauthorized.",
      });
    }

    // Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Unauthorized.",
      });
    }

    // Attach to req
    req.user = user;

    next();
  } catch (error) {
    // Token expired or invalid
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please login again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
      error: error.message,
    });
  }
};