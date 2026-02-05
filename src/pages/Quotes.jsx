import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const quotes = [
    "Small steps every day lead to big changes ",
    "Discipline is choosing what you want most over what you want now.",
    "Your future self is watching you right now.",
    "You don’t need motivation, you need consistency.",
    "Be patient. You’re becoming something amazing ",
    "Small progress is still progress.",
    "One day or day one — you decide.",
    "Your habits shape your future.",
    "Slow growth is still growth",
    "Focus on becoming, not achieving.",
    "You’re building a life, not rushing a moment.",
    "Consistency beats motivation every time.",
    "Show up even on the days you don’t feel like it.",
    "Your future self will thank you.",
    "Discipline is self-love in action.",
    "You don’t need more time, you need more intention.",
    "Healing and growth can happen together.",
    "Progress looks different for everyone.",
    "Start messy, improve later.",
    "You are allowed to grow at your own pace.",
    "Do it tired. Do it scared. Just do it.",
    "Every small win counts",
    "You’re closer than you think.",
    "Dreams need structure, not just hope.",
    "Trust the process, even when it’s quiet.",
    "Your effort today is an investment.",
    "Become someone you’re proud of.",
    "Keep going — your story isn’t done yet.",
    "Little steps, big life.",
    "You’re creating something meaningful",
];

const Quotes = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex items-center justify-center px-4">
      <BackButton to="/dashboard" />

      <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-10 text-center">
        
         
        <div className="border-2 border-pink-200 rounded-2xl p-8 mb-8">
          <p className="text-2xl font-serif text-gray-800 leading-relaxed">
            {quotes[index]}
          </p>
        </div>

         
        <div className="flex justify-between items-center">
          
           
          {index > 0 ? (
            <button
              onClick={() => setIndex(index - 1)}
              className="px-6 py-2 rounded-full bg-pink-100 hover:bg-pink-200 transition"
            >
              ← Previous
            </button>
          ) : (
             <button
             disabled
              onClick={() => setIndex(index - 1)}
              className="px-6 py-2 rounded-full bg-pink-100 hover:bg-pink-200 transition opacity-50"
            >
              ← Previous
            </button>  
          )}

           
          {index < quotes.length - 1 && (
            <button
              onClick={() => setIndex(index + 1)}
              className="px-6 py-2 rounded-full bg-purple-200 hover:bg-purple-300 transition"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quotes;
