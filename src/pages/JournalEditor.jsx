import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import BackButton from "../components/BackButton";
const JournalEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
const backPath = id ? "/journal/list" : "/journal";
   
  const isViewMode =
    new URLSearchParams(location.search).get("mode") === "view";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

   
  useEffect(() => {
    if (id) {
      const saved = JSON.parse(localStorage.getItem("journals")) || [];
      const journal = saved.find((j) => j.id === Number(id));
      if (journal) {
        setTitle(journal.title);
        setContent(journal.content);
      }
    }
  }, [id]);

   
  const saveJournal = () => {
    if (!title.trim() || !content.trim()) return;

    const saved = JSON.parse(localStorage.getItem("journals")) || [];

    if (id) {
       
      const updated = saved.map((j) =>
        j.id === Number(id) ? { ...j, title, content } : j
      );
      localStorage.setItem("journals", JSON.stringify(updated));
    } else {
       
      const newJournal = {
        id: Date.now(),
        title,
        content,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(
        "journals",
        JSON.stringify([newJournal, ...saved])
      );
    }

    navigate("/journal/list");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 px-4 py-10">
        <BackButton to={backPath} />
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-6">
           
         
        <h1 className="text-2xl font-bold text-center text-pink-900">
          {isViewMode ? "View Journal" : id ? "Edit Journal" : "New Journal"}
        </h1>

         
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isViewMode}
          placeholder="Journal title..."
          className="
  w-full
  border-b border-pink-200
  pb-2
  text-lg font-semibold
  text-pink-900
  placeholder:text-pink-300
  focus:outline-none
  focus:border-pink-400
"
        />

         
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isViewMode}
          rows={10}
          placeholder="Start writing..."
          className="
    w-full
    min-h-[220px]
    border border-pink-100
    rounded-2xl
    px-4 py-3
    resize-none
    text-[15px] leading-relaxed
    text-gray-700
    placeholder:text-gray-400
    focus:outline-none
    focus:ring-2 focus:ring-pink-200
  "
        />

        
        <div className="flex justify-between items-center">
           

          {!isViewMode && (
            <button
              onClick={saveJournal}
              className="
  mt-2 py-2
  px-4 rounded-xl
  text-white font-medium
  bg-gradient-to-r from-purple-300 to-amber-400
  hover:from-purple-400 hover:to-amber-500
  transition-all duration-200
"
            >
              Save
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default JournalEditor;

