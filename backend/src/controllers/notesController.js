import Note from "../model/Note.js";
import User from "../model/User.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await User.findOne({ userId: req.params.id }).populate(
      "notes",
    );

    if (!notes?.notes || notes?.notes?.length === 0) {
      if (notes === null) {
        await User.create({ userId: req.params.id }, { new: true });
      }
      return res.status(200).json([]);
    }
    console.log("hi::: ", notes);
    res.status(200).json(notes.notes);
  } catch (e) {
    console.error("Error in getAllNotes2: ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNote = async (req, res) => {
  try {
    const notes = await User.findOne(
      {
        userId: req.params.userId,
        "notes._id": req.params.id,
      },
      {
        "notes.$": 1,
      },
    );

    console.log("hi::: ", notes);
    res.status(200).json(notes.notes[0]);
  } catch (e) {
    console.error("Error in getAllNotes2: ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createUserNote = async (req, res) => {
  try {
    const { userId, content, title } = req.body;

    const newNote = await User.findOneAndUpdate(
      { userId: userId },
      { $push: { notes: new Note({ title, content }) } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    if (!newNote) {
      console.log("BONG");
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ message: "User Note created!" });
  } catch (e) {
    console.error("Error in createUserNote: ", e);
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

    const noteToUpdate = await User.findOneAndUpdate(
      {
        userId: req.params.userId,
        "notes._id": req.params.id,
      },
      { $set: { "notes.$.title": title, "notes.$.content": content } },
      { new: true },
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
    const noteToDelete = await User.findOneAndUpdate(
      { userId: req.params.userId },
      { $pull: { notes: { _id: req.params.id } } },
      { new: true },
    );

    if (!noteToDelete) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted!" });
  } catch (e) {
    console.error("Error in deleteNote: ", e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
