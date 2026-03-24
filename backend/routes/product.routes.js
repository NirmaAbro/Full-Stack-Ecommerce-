import express from "express";
import { adminOnly } from "../middleware/admin.middleware.js";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute,  createProduct);
router.get("/", protectRoute, getAllProducts);
router.put("/:id", protectRoute, updateProduct);
router.delete("/:id", protectRoute, deleteProduct);

export default router;
