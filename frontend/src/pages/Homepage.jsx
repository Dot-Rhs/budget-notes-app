import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import RateLimitedUI from "../components/RateLimitedUI/RateLimitedUI";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { NotebookIcon } from "lucide-react";
import NoteCard from "../components/NoteCard/NoteCard";
import api from "../lib/axios.js";
import NotesNotFound from "../components/NotesNotFound/NotesNotFound.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../components/LoginButton/LoginButton.jsx";
import { SignupButton } from "../components/SignupButton/SignupButton.jsx";

export const Homepage = () => {
  const [rateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth0();

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
    <div>
      {/* <Navbar /> */}
      {isAuthenticated ? (
        <>
          {rateLimited && <RateLimitedUI />}

          <div className="max-w-7xl mx-auto p-4 mt-6">
            {loading && (
              <div className="text-center text-primary py-10">
                Loading notes...
              </div>
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
            {!loading && !rateLimited && notes.length === 0 && (
              <NotesNotFound />
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center rounded-lg mt-2 border-4 border-solid border-primary mt-[25%]">
          <div className="bg-secondary/20 rounded-full p-8">
            <NotebookIcon className="size-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">Login to start creating notes!</h3>
          {/* <p className="text-base-content/70">
            You can create a note by clicking below, all your notes will be
            displayed here.
          </p> */}
          <LoginButton /> 
          <SignupButton />
        </div>
      )}
    </div>
  );
};
