import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    if (!window.confirm("You ultra sure?")) return;

    try {
      await api.delete(`/notes/${id}`);

      toast.success("Note deleted, it's gone bab!");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note: ", error);
      toast.error("Error deleting note, please try again");
    }
  };

  const handleSubmit = async (e) => {
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

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(() => res.data);
      } catch (error) {
        console.log("Error in NoteDetailPage: ", error);
        toast.error("Error fetching note, please try again later");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={note.title}
                    onChange={(e) =>
                      setNote((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Your note goes here..."
                    className="text-area text-area-bordered h-32"
                    value={note.content}
                    onChange={(e) =>
                      setNote((prev) => ({ ...prev, content: e.target.value }))
                    }
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Saving Note..." : "Save Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
