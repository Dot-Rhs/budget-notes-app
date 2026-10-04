import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import { checkJwt } from "./middleware/auth.js";
import { envCheck } from "./utils.js";
import helmet from "helmet";

dotenv.config();
envCheck();
const PORT = process.env.PORT || 5001;
const app = express();
const __dirname = path.resolve();

app.use(express.json({ limit: "128kb" })); // to parse JSON request bodies

if (process.env.NODE_ENV !== "production") {
  app.use(helmet());
  app.use(
    cors({
      origin: "http://localhost:5173", // Adjust this to your frontend URL
    }),
  );
}

app.use("/api/notes", checkJwt, rateLimiter, notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.set("trust proxy", 1);
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

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
