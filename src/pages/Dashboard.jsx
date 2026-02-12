import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useRef } from "react";
import useSwipeBackWithAnimation from "../hooks/useSwipeBackWithAnimation";

 

const Dashboard = () => {
  const navigate = useNavigate();
  const pageRef = useRef(null);
useSwipeBackWithAnimation("/", pageRef);


  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex items-center justify-center">
      <BackButton to="/" />
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-4">
        
        <button
          onClick={() => navigate("/notes")}
          className="w-full py-3 rounded-xl bg-pink-100 hover:bg-pink-200 transition"
        >
          📝 Notes
        </button>

        <button
          onClick={() => navigate("/journal")}
          className="w-full py-3 rounded-xl bg-purple-100 hover:bg-purple-200 transition"
        >
          📖 Journal
        </button>

<div
  onClick={() => navigate("/todo")}
  className="
    cursor-pointer
    bg-pink-50
    rounded-xl px-4 py-3
    hover:bg-pink-100
    transition-all duration-200
    flex items-center justify-center gap-2
  "
>
  ⏰ Todo
</div>
        <button
  onClick={() => navigate("/goals")}
  className="
    w-full py-3 rounded-xl
    bg-purple-100 hover:bg-purple-200
    transition-all duration-200
  "
>
  🎯 Goals
</button>

<button
  onClick={() => navigate("/quotes")}
  className="w-full py-3 rounded-xl bg-indigo-100 hover:bg-indigo-200 transition"
>
  💬 Quotes
</button>

        <button
  onClick={() => navigate("/challenges")}
  className="w-full py-3 rounded-xl bg-pink-100 hover:bg-pink-200 transition"
>
  🧩 Challenge 
</button>



      </div>
    </div>
  );
};

export default Dashboard;
