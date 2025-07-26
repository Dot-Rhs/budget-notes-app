import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import GlobalContext from "../context/context";
import ModalDeleteContent from "../components/Modal/ModalContent";
import NoteForm from "../components/NoteForm/NoteForm";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { setModalContent } = useContext(GlobalContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleOpenModal = (e) => {
    e.preventDefault();
    setModalContent({
      open: true,
      id: "delete-note-modal",
      header: "Delete Note",
      body: <ModalDeleteContent callback={handleDelete} />,
    });
  };

  const handleDelete = async () => {
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
            <Link to="/" className="btn btn-ghost group hover:bg-primary/50">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleOpenModal}
              className="group btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5 group-hover:text-black/70" />
              <p className="group-hover:text-black/70">Delete Note</p>
            </button>
          </div>
          <NoteForm id={id} currentNote={note} />
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
