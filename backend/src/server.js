import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import { rateLimiter } from "./middleware/rateLimiter.js";

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json()); // to parse JSON request bodies
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
  }),
);
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started on port: " + PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with failure
  });
