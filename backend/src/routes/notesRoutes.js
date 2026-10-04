import express from "express";
import {
  deleteNote,
  getAllNotes,
  updateNote,
  createUserNote,
  getNote,
} from "../controllers/notesController.js";
import { checkJwt } from "../middleware/auth.js";
import { validateNote } from "../middleware/noteValidation.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNote);
router.put("/:id", validateNote, updateNote);
router.delete("/:id", deleteNote);
router.post("/createUserNote", validateNote, createUserNote);

export default router;
