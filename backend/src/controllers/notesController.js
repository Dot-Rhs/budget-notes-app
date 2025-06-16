export const getAllNotes = (req, res) => {
  res.status(200).send("notes yea");
};

export const createNote = (req, res) => {
  res.status(201).json({ message: "Note created!" });
};

export const updateNote = (req, res) => {
  res.status(200).json({ message: "post updated" });
};

export const deleteNote = (req, res) => {
  res.status(200).json({ message: "post deleted" });
};
