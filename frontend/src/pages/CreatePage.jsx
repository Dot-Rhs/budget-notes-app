import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import NoteForm from "../components/NoteForm/NoteForm.jsx";

const CreatePage = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <NoteForm />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
