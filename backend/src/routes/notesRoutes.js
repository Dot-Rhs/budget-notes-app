import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  getNote,
  createUserNote,
  // getAllUserNotes,
  getAllNotes2,
} from "../controllers/notesController.js";

const router = express.Router();

// router.get("/", getAllNotes);
router.get("/:id", getAllNotes2);
// router.get("/:id", getNote);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:userId/:id", deleteNote);
router.post("/createUserNote", createUserNote);
// router.get("/userNotes", getAllUserNotes);

export default router;
