import request from "supertest";
import app from "../app.js";

describe("Auth API", () => {

  test("should register user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Admin User",
        email: "admin@test.com",
        password: "12345678"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  test("should login user", async () => {
    // first register
    await request(app).post("/api/auth/register").send({
      name: "Admin User",
      email: "admin@test.com",
      password: "12345678"
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "12345678"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

});
