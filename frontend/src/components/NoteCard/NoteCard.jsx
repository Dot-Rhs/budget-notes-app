import React, { useContext } from "react";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { formatDate } from "../../lib/utils";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import GlobalContext from "../../context/context";
import ModalDeleteContent from "../Modal/ModalContent";

const NoteCard = ({ note, setNotes }) => {
  const { setModalContent } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success("Note deleted");
    } catch (error) {
      console.log("Error deleting in handleDelete(): ", error);
      toast.error("Error deleting note...");
    }

    navigate("/");
  };

  const handleModal = (e) => {
    e.preventDefault();

    setModalContent({
      open: true,
      id: "delete-note-modal",
      header: "Delete Note",
      body: <ModalDeleteContent callback={() => handleDelete(note._id)} />,
    });
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-secondary"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-2 ">
            <button className="btn btn-ghost btn-sm group hover:bg-primary">
              <PenSquareIcon className="size-5 group-hover:text-white" />
            </button>
            <button
              className="btn btn-ghost btn-sm text-error group hover:bg-secondary"
              onClick={handleModal}
            >
              <Trash2Icon className="size-5 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
