import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import RateLimitedUI from "../components/RateLimitedUI/RateLimitedUI";
import { useEffect } from "react";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard/NoteCard";
import api from "../lib/axios.js";
import NotesNotFound from "../components/NotesNotFound/NotesNotFound.jsx";

export const Homepage = () => {
  const [rateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");

        setNotes(res.data);
        setRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes: ", error);
        if (error.response?.status === 429) setRateLimited(true);
        else toast.error("Error fetching notes, please try again later");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {rateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}
        {!rateLimited && notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => {
              return (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              );
            })}
          </div>
        )}
        {!loading && !rateLimited && notes.length === 0 && <NotesNotFound />}
      </div>
    </div>
  );
};
