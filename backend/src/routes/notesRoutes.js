import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  createUserNote,
  getNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/:id", getAllNotes);
router.post("/", createNote);
router.put("/:userId/:id", updateNote);
router.delete("/:userId/:id", deleteNote);
router.post("/createUserNote", createUserNote);
router.get("/:userId/:id", getNote);

export default router;
