import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "api is running fine",
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log("server is running on port", port);
  });
};

startServer();

export default app;
