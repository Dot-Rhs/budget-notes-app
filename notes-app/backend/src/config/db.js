import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://note-bot-human:2Gl8AKQKWKrESSOy@cluster0.r1uhjwy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("MongoDB connected successfully");
  } catch (e) {
    console.error("Failed to connect to MongoDB: ", e);
    process.exit(1);
  }
};
