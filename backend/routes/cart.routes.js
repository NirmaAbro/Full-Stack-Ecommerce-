import express from "express";
import { adminOnly } from "../middleware/admin.middleware.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateCartQuantity,
} from "../controller/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, addToCart);
router.get("/", protectRoute, getCart);
router.delete("/:productId", protectRoute, removeFromCart);
router.delete("/", protectRoute, clearCart);
router.put("/:productId", protectRoute, updateCartQuantity);

export default router;
