import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import BackButton from "../components/BackButton";
import { useRef } from "react";
import useSwipeBackWithAnimation from "../hooks/useSwipeBackWithAnimation";

const defaultChallenges = [
  "No phone until after breakfast",
  "Do one thing that scares you",
  "Cold shower",
  "20 min HIIT",
  "Write top 3 priorities",
  "Finish one avoided task",

  "No social media all day",
  "8000 steps minimum",
  "Eat only healthy meals",
  "No coffee today",
  "No complaining",
  "Track expenses",

  "Meditate 15 minutes",
  "Zero sugar today",
  "Journal for 20 minutes",
  "Clean one space",
  "No snacks between meals",
  "1 hour focused work",

  "Drink water all day",
  "Stretch 30 minutes",
  "Go to bed by 9 PM",
  "Wake up at 6 AM",
  "Read 50 pages",
  "Write next month goals",

  "Run or jog 15 minutes",
  "No TV / YouTube",
  "Write everything to-do",
  "Install habit tracker",
  "Plan schedule in detail",
  "Reflect on today",
];

const fireConfetti = () => {
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 },
  });
};

const Challenges = () => {

  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const pageRef = useRef(null);
useSwipeBackWithAnimation("/dashboard", pageRef);

   
  useEffect(() => {
    const saved = localStorage.getItem("mindnest-challenges");

    if (saved) {
      const parsed = JSON.parse(saved);

      if (parsed.length === 0) {
        setChallenges(
          defaultChallenges.map((title, i) => ({
            id: i + 1,
            title,
            completed: false,
          }))
        );
      } else {
        setChallenges(parsed);
      }
    } else {
      setChallenges(
        defaultChallenges.map((title, i) => ({
          id: i + 1,
          title,
          completed: false,
        }))
      );
    }
  }, []);

   
  useEffect(() => {
    if (challenges.length > 0) {
      localStorage.setItem(
        "mindnest-challenges",
        JSON.stringify(challenges)
      );
    }
  }, [challenges]);

  const toggleChallenge = (id) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          if (!c.completed) fireConfetti();
          return { ...c, completed: !c.completed };
        }
        return c;
      })
    );
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 px-6 pt-2   mx">
       
        <BackButton to="/dashboard"/>
      <div className="bg-white rounded-3xl shadow-xl ml-15 mr-15  p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-pink-900 mb-0.5">
           Daily Challenges
        </h1>
        <p className="text-center text-gray-500 mb-5">
          One small win at a time 
        </p>

         
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {challenges.map((c) => (
            <div
              key={c.id}
              onClick={() => toggleChallenge(c.id)}
              className={`relative cursor-pointer rounded-xl p-2 text-xs
                h-[80px] flex items-center justify-center text-center
                transition-all duration-300
                ${
                  c.completed
                    ? "bg-pink-200 text-pink-900"
                    : "bg-pink-100 hover:bg-pink-200"
                }`}
            >
               
              <div
                className={`absolute top-2 left-2 w-4 h-4 rounded-full  
                  border-2 flex items-center justify-center
                  ${
                    c.completed
                      ? "bg-pink-500 border-pink-500"
                      : "border-gray-400"
                  }`}
              >
                {c.completed && (
                  <span className="text-white text-xs animate-tick">
                    ✓
                  </span>
                )}
              </div>

              {c.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challenges;
