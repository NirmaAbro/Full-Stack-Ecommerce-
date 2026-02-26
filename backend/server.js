import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authroutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

app.use("/api/auth", authroutes);


const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log("server is running on port", port);
  });
};

startServer();

export default app;
