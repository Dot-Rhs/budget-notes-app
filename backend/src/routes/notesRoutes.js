import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  getNote,
  createUserNote,
  getAllUserNotes,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNote);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.post("/createUserNote", createUserNote);
router.get("/userNotes", getAllUserNotes);

export default router;
