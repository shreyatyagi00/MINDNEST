import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";


const JournalHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md text-center space-y-6">
        <BackButton to="/dashboard"/>
        
        <h1 className="text-3xl font-bold text-pink-900">
          Journal
        </h1>

        <p className="text-gray-500">
          Write freely. Reflect deeply 
        </p>

         
        <button
          onClick={() => navigate("/journal/new")}
          className="w-full py-3 rounded-full text-white font-semibold
                     bg-gradient-to-r from-purple-400 to-pink-400
                     hover:from-purple-500 hover:to-pink-500
                     transition-all duration-300 shadow-md"
        >
          ➕ New Journal
        </button>

         
        <button
          onClick={() => navigate("/journal/list")}
          className="w-full py-3 rounded-full font-semibold
                     border border-pink-300 text-pink-700
                     hover:bg-pink-50 transition"
        >
          📂 Existing Journals
        </button>

      </div>
    </div>
  );
};

export default JournalHome;
