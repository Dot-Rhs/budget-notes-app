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

const allowedOrigins =
  process.env.NODE_ENV !== "production"
    ? JSON.parse(process.env.LOCAL_ORIGINS)
    : JSON.parse(process.env.PROD_ORIGINS);

envCheck();

const PORT = process.env.PORT || 5001;
const app = express();
const __dirname = path.resolve();

app.use(express.json({ limit: "128kb" })); // to parse JSON request bodies

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS policy"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: process.env.NODE_ENV !== "production" ? false : true,
  }),
);

if (process.env.NODE_ENV !== "production") {
  app.use(helmet());
}

app.use("/api/notes", checkJwt, rateLimiter, notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", `https://${process.env.AUTH0_DOMAIN}`],
          connectSrc: ["'self'", `https://${process.env.AUTH0_DOMAIN}`],
          imgSrc: ["'self'", "data:"],
          fontSrc: ["'self'", "data:"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
          baseUri: ["'self'"],
        },
      },
    }),
  );
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
