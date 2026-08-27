import mongoose, { Schema } from "mongoose";
import Note, { noteSchema } from "./Note.js";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    notes: [noteSchema],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
