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

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order APIs
 */

/* USER ROUTES */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order placed
 */


router.post("/", protectRoute, placeOrder);


/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Get logged-in user orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User orders fetched
 */

router.get("/my-orders", protectRoute, getMyOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *       404:
 *         description: Order not found
 */

router.get("/:id", protectRoute, getOrderById);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Cancel order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       404:
 *         description: Order not found
 */

router.delete("/:id", protectRoute, cancelOrder);

/* ADMIN ROUTES */

/**
 * @swagger
 * /api/orders/admin/orders:
 *   get:
 *     summary: Get all orders (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All orders fetched
 */

router.get("/admin/orders", protectRoute, adminOnly, getAllOrders);

/**
 * @swagger
 * /api/orders/admin/{id}:
 *   put:
 *     summary: Update order status (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderStatus'
 *     responses:
 *       200:
 *         description: Order status updated
 *       404:
 *         description: Order not found
 */

router.put("/admin/:id", protectRoute, adminOnly, updateOrderStatus);


export default router;