import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

connectDB();

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
