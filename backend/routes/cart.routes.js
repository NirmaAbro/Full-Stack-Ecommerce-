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

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart APIs
 */


/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddToCart'
 *     responses:
 *       200:
 *         description: Product added to cart
 */

router.post("/", protectRoute, addToCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 */

router.get("/", protectRoute, getCart);

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       404:
 *         description: Item not found
 */

router.delete("/:productId", protectRoute, removeFromCart);

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: Clear entire cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 */

router.delete("/", protectRoute, clearCart);

/**
 * @swagger
 * /api/cart/{productId}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *       404:
 *         description: Item not found
 */

router.put("/:productId", protectRoute, updateCartQuantity);

export default router;
