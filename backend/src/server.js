import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();

connectDB();

app.use("/api/notes", notesRoutes);

app.listen(5001, () => {
  console.log("Server started on port: 5001");
});

// mongodb+srv://note-bot-human:2Gl8AKQKWKrESSOy@cluster0.r1uhjwy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
