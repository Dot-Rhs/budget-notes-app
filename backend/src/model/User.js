import mongoose, { Schema } from "mongoose";
import Note from "./Note.js";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
