import request from "supertest";
import app from "../app.js";
import { adminToken, userToken } from "./setup.js";

describe("Product API", () => {

  it("should create product with admin", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Test Product",
        description: "Test desc",
        price: 100,
        stock: 10,
        category: "Test",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("should NOT allow user to create product", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Fail Product",
        description: "Fail",
        price: 50,
        stock: 5,
        category: "Test",
      });

    expect(res.statusCode).toBe(403);
  });

});


