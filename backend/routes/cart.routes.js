import express from "express";
import { adminOnly } from "../middleware/admin.middleware.js";
import { addToCart, getCart } from "../controller/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, addToCart);
router.get("/", protectRoute, getCart);

export default router;
