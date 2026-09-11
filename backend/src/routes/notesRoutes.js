import express from "express";
import {
  deleteNote,
  getAllNotes,
  updateNote,
  createUserNote,
  getNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.post("/createUserNote", createUserNote);

export default router;
