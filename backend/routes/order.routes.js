import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controller/order.controller.js";

import { adminOnly } from "../middleware/admin.middleware.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

/* USER ROUTES */

router.post("/", protectRoute, placeOrder);

router.get("/my-orders", protectRoute, getMyOrders);

router.get("/:id", protectRoute, getOrderById);

router.delete("/:id", protectRoute, cancelOrder);

/* ADMIN ROUTES */

router.get("/admin/orders", protectRoute, adminOnly, getAllOrders);

router.put("/admin/:id", protectRoute, adminOnly, updateOrderStatus);


export default router;