import Note from "../model/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (e) {
    console.error("Error in getAllNotes: ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createNote = async (req, res) => {
  try {
    console.log("GREEEEGGG::: ", req.body);
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).json({ message: "Note created!" });
  } catch (e) {
    console.error("Error in createNote: ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = (req, res) => {
  res.status(200).json({ message: "post updated" });
};

export const deleteNote = (req, res) => {
  res.status(200).json({ message: "post deleted" });
};
