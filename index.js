import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import todoRouter from "./route/todo.route.js";
import userRouter from "./route/auth.route.js"


// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/user",userRouter);
app.use("/api/todo", todoRouter);


// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("✅ Database is connected.");
  } catch (error) {
    console.error("❌ Database is not connected:", error.message);
    process.exit(1);
  }
};

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});
