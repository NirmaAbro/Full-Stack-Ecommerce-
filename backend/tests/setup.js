import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import connectDB from "../config/db.js";

export let adminToken;
export let userToken;

// ✅ Connect DB once
beforeAll(async () => {
  await connectDB();

  // 🔐 Login Admin
  const adminRes = await request(app).post("/api/auth/login").send({
    email: "admin@example.com",
    password: "admin123",
  });

  if (!adminRes.body.token) {
    throw new Error("❌ Admin login failed - user may not exist");
  }

  adminToken = adminRes.body.token;

  // 🔐 Login User
  const userRes = await request(app).post("/api/auth/login").send({
    email: "user@example.com",
    password: "user123",
  });

  if (!userRes.body.token) {
    throw new Error("❌ User login failed - user may not exist");
  }

  userToken = userRes.body.token;
});

// ❗ DO NOT delete DB (otherwise users gone)
afterAll(async () => {
  await mongoose.connection.close();
});