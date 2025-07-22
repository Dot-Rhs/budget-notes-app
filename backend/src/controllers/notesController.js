import Note from "../model/Note.js";

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (e) {
    console.error("Error in getAllNotes: ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).json({ message: "Note created!" });
  } catch (e) {
    console.error("Error in createNote: ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const noteToUpdate = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    );

    if (!noteToUpdate) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(noteToUpdate);
    // Assuming Note.findByIdAndUpdate is a valid method to update a note
  } catch (e) {
    console.error("Error in updateNote: ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteToDelete = await Note.findByIdAndDelete(req.params.id);

    if (!noteToDelete) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted!" });
  } catch (e) {
    console.error("Error in deleteNote: ", e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (e) {
    console.error("Error in getNote: ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};
