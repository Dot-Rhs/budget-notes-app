import mongoose from "mongoose";

export const noteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      maxlength: 10000,
    },
  },
  { timestamps: true },
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
