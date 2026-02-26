import express from "express";
import { adminOnly } from "../middleware/admin.middleware.js";
import {
  createProduct,
  getAllProducts,
} from "../controller/product.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", adminOnly, protectRoute, createProduct);

router.get("/", protectRoute, getAllProducts);

export default router;
