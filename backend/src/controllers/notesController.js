import Note, { noteSchema } from "../model/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const userId = req.auth.payload.sub;

    const notes = await Note.find({ userId });

    if (!notes) {
      return res.status(200).json([]);
    }
    console.log("hi::: ", notes);
    res.status(200).json(notes);
  } catch (e) {
    console.error("Error in getAllNotes: ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNote = async (req, res) => {
  try {
    const userId = req.auth.payload.sub;

    const note = await Note.findOne({
      userId,
      _id: req.params.id,
    });

    console.log("hi::: ", note);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (e) {
    console.error("Error in getAllNotes: ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createUserNote = async (req, res) => {
  try {
    const { content, title } = req.body;
    const userId = req.auth.payload.sub;

    const newNote = new Note({
      userId,
      title,
      content,
    });
    await newNote.save();

    res.status(201).json(newNote);
  } catch (e) {
    console.error("Error in createUserNote: ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.auth.payload.sub;

    const noteToUpdate = await Note.findOneAndUpdate(
      {
        userId,
        _id: req.params.id,
      },
      { $set: { title, content } },
      { new: true, runValidators: true },
    );

    if (!noteToUpdate) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(noteToUpdate);
  } catch (e) {
    console.error("Error in updateNote: ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const userId = req.auth.payload.sub;
    const noteToDelete = await Note.deleteOne({ userId, _id: req.params.id });

    if (!noteToDelete.deletedCount) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted!" });
  } catch (e) {
    console.error("Error in deleteNote: ", e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
