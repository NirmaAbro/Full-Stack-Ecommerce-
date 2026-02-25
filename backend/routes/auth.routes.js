import express from "express";
import { registerUser, login } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/login", login);

export default router;
