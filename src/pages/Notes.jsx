import React, { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import BackButton from "../components/BackButton";
import useSwipeBackWithAnimation from "../hooks/useSwipeBackWithAnimation";

const Notes = () => {
  // 🔹 Swipe animation ref
  const pageRef = useRef(null);

  // 🔹 Enable swipe back to dashboard
  useSwipeBackWithAnimation("/dashboard", pageRef);

  // 🔹 States
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [filter, setFilter] = useState("notes");

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("journal-notes");
    return saved ? JSON.parse(saved) : [];
  });

  // 🔹 Add new note
  function submitHandler(e) {
    e.preventDefault();

    if (!title.trim()) return;

    const newNote = {
      id: Date.now(),
      title,
      content,
      done: false,
      archived: false,
      createdAt: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  }

  // 🔹 Toggle complete
  function toggleDone(id) {
    setNotes(
      notes.map((n) =>
        n.id === id ? { ...n, done: !n.done } : n
      )
    );
  }

  // 🔹 Toggle archive
  function toggleArchive(id) {
    setNotes(
      notes.map((n) =>
        n.id === id ? { ...n, archived: !n.archived } : n
      )
    );
  }

  // 🔹 Delete note
  function deleteHandler(id) {
    setNotes(notes.filter((n) => n.id !== id));
  }

  // 🔹 Filter notes
  const filteredNotes = notes.filter((n) => {
    if (filter === "notes") return !n.done && !n.archived;
    if (filter === "all") return true;
    if (filter === "archived") return n.archived;
    return true;
  });

  // 🔹 Save to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("journal-notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div
      ref={pageRef}
      className="min-h-screen transition-transform transition-opacity duration-300"
    >
      <div className="min-h-screen px-4 bg-gradient-to-br from-purple-200 via-pink-200 to-indigo-200">
        <BackButton to="/dashboard" />

        {/* Add Note Form */}
        <div className="flex justify-center">
          <div className="mt-12 w-full max-w-md bg-white rounded-3xl p-6 shadow-xl">
            <h1 className="text-[26px] font-bold text-center text-pink-900 mb-6">
              Mind Notes
            </h1>

            <form onSubmit={submitHandler} className="flex flex-col gap-4">
              <input
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-pink-300"
              />

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing..."
                rows={4}
                className="border rounded-xl px-4 py-2 resize-none focus:ring-2 focus:ring-pink-300"
              />

              <button
                className="
                  py-2 rounded-xl text-white font-medium
                  bg-gradient-to-r from-purple-300 to-amber-400
                  hover:from-purple-400 hover:to-amber-500
                  transition-all duration-100
                "
              >
                Save Note
              </button>
            </form>
          </div>
        </div>

        {/* Filter Buttons */}
        {notes.length > 0 && (
          <div className="flex justify-center gap-4 mt-10">
            {[
              { key: "notes", label: "Notes" },
              { key: "all", label: "All" },
              { key: "archived", label: "Archived" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-1 rounded-full text-sm ${
                  filter === f.key
                    ? "bg-white text-pink-600 font-semibold"
                    : "text-white/80"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="mt-10 text-center text-white">
            <div className="text-5xl mb-3">📝</div>

            {filter === "notes" && (
              <p className="text-lg">
                No active notes yet.<br />
                Start writing something
              </p>
            )}

            {filter === "all" && (
              <p className="text-lg">
                Nothing here yet.<br />
                Complete or archive a note to see it here.
              </p>
            )}

            {filter === "archived" && (
              <p className="text-lg">
                No archived notes.<br />
                Keep something for later
              </p>
            )}
          </div>
        )}

        {/* Notes Cards */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 pb-16">
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              {...note}
              currentFilter={filter}
              toggleDone={toggleDone}
              toggleArchive={toggleArchive}
              deleteHandler={deleteHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
