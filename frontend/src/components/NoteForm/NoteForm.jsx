import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../../lib/axios";

const NoteForm = ({ currentNote = { title: "", content: "" }, id = null }) => {
  const [note, setNote] = useState(currentNote);
  const [saving, setSaving] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setSaving(true);

    try {
      await api.post("/notes", {
        title: note.title,
        content: note.content,
      });

      toast.success("Note saved!");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 429) {
        console.log("Error saving note: ", error);
        toast.error("Too many requests, stop spamming yea...", {
          duration: 5000,
          icon: "🚫",
        });
        return;
      }
      toast.error("Error saving note, please try again later");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });

      toast.success("Note updated!");
      navigate("/");
    } catch (error) {
      console.log("Error updating note: ", error);
      toast.error("Error updating note, please try again later");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <form onSubmit={id ? handleUpdate : handleSubmit} id="note-form">
          <div className="form-control mb-4">
            <label className="label" htmlFor="note-title-input">
              <span className="label-text">Title</span>
            </label>
            <input
              id="note-title-input"
              type="text"
              placeholder="Note Title"
              className="input input-bordered rounded-md"
              value={note.title}
              onChange={(e) =>
                setNote((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="form-control mb-4">
            <label className="label" htmlFor="note-content-input">
              <span className="label-text">Content</span>
            </label>
            <textarea
              id="note-content-input"
              type="text"
              placeholder="Your note goes here..."
              className="textarea textarea-bordered h-32 p-2 rounded-md"
              value={note.content}
              onChange={(e) =>
                setNote((prev) => ({ ...prev, content: e.target.value }))
              }
            />
          </div>
          <div className="card-actions justify-end">
            <button
              type="submit"
              className="btn btn-primary hover:text-base-300"
              disabled={saving}
            >
              {saving ? "Saving Note..." : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
