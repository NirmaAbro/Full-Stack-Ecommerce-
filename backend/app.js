import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authroutes from "./routes/auth.routes.js";
import productroutes from "./routes/product.routes.js";
import cartroutes from "./routes/cart.routes.js";
import orderroutes from "./routes/order.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());


app.use("/api/auth", authroutes);
app.use("/api/products", productroutes);
app.use("/api/cart", cartroutes);
app.use("/api/order", orderroutes);

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log("server is running on port", port);
  });
};

if (process.env.NODE_ENV !== "test") {
    startServer();
}

export default app;
