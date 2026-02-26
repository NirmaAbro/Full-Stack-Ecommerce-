import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  let token;

  // 1️⃣ Check if token exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2️⃣ Token missing
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token missing",
    });
  }

  try {
    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // 4️⃣ Get full user (without password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // 5️⃣ Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid token",
    });
  }
};
