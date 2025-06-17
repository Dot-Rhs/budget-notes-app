import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("MongoDB connected successfully");
  } catch (e) {
    console.error("Failed to connect to MongoDB: ", e);
    process.exit(1);
  }
};
