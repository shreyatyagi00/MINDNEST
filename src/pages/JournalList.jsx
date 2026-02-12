import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useRef } from "react";
import useSwipeBackWithAnimation from "../hooks/useSwipeBackWithAnimation";

const JournalList = () => {
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  const pageRef = useRef(null);
  useSwipeBackWithAnimation("/journal", pageRef);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("journals")) || [];
    setJournals(saved);
  }, []);

  function deleteJournal(id) {
    const updated = journals.filter(j => j.id !== id);
    setJournals(updated);
    localStorage.setItem("journals", JSON.stringify(updated));
  }

  return (
    <div ref={pageRef}  className="min-h-screen px-4 py-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
        <BackButton to="/journal" />
      <div className="max-w-3xl mx-auto">

         
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-pink-900">
            Your Journals 📔
          </h1>

           
        </div>

         
        {journals.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-500 shadow">
            No journals yet. Start writing 🌱
          </div>
        )}

        
        <div className="space-y-4">
          {journals.map(journal => (
            <div
              key={journal.id}
              className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg text-pink-900">
                {journal.title}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(journal.createdAt).toDateString()}
              </p>

               

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => navigate(`/journal/edit/${journal.id}`)}
                  className="text-sm text-purple-600 hover:underline"
                >
                    Edit
                </button>

                <button
                  onClick={() => deleteJournal(journal.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                   Delete
                </button>

                <button
  onClick={() => navigate(`/journal/edit/${journal.id}?mode=view`)}
  className="text-sm text-blue-600 hover:underline"
>
   View
</button>


              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default JournalList;
