import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/auth.routes.js";
import productroutes from "./routes/product.routes.js";
import cartroutes from "./routes/cart.routes.js";
import orderroutes from "./routes/order.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());

// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use("/api/auth", authroutes);
app.use("/api/products", productroutes);
app.use("/api/cart", cartroutes);
app.use("/api/order", orderroutes);

export default app;