import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authroutes from "./routes/auth.routes.js";
import productroutes from "./routes/product.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

app.use("/api/auth", authroutes);
app.use("/api/product", productroutes);

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log("server is running on port", port);
  });
};

startServer();

export default app;
