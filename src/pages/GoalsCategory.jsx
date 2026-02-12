import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useRef } from "react";
import useSwipeBackWithAnimation from "../hooks/useSwipeBackWithAnimation";

const RADIUS = 60;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const GoalsCategory = () => {
  const { categoryKey } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  useSwipeBackWithAnimation("/goals", pageRef);

  const [category, setCategory] = useState(null);
  const [newGoal, setNewGoal] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("mindnest-goals")) || {};
    if (!stored[categoryKey]) return;
    setCategory(stored[categoryKey]);
  }, [categoryKey]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Category not found
      </div>
    );
  }

  const goals = category.goals || [];
  const completed = goals.filter((g) => g.done).length;
  const progress = goals.length
    ? Math.round((completed / goals.length) * 100)
    : 0;

  const offset =
    CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  const save = (updatedGoals) => {
    const stored = JSON.parse(localStorage.getItem("mindnest-goals")) || {};
    stored[categoryKey].goals = updatedGoals;
    localStorage.setItem("mindnest-goals", JSON.stringify(stored));
    setCategory({ ...category, goals: updatedGoals });
  };

  const toggleGoal = (id) => {
    const updated = goals.map((g) =>
      g.id === id ? { ...g, done: !g.done } : g
    );
    save(updated);
  };

  const deleteGoal = (id) => {
    const updated = goals.filter((g) => g.id !== id);
    save(updated);
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
    const updated = [
      ...goals,
      { id: Date.now(), text: newGoal, done: false },
    ];
    save(updated);
    setNewGoal("");
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex justify-center items-center px-4">
      <BackButton to="/goals" />
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl p-10 grid grid-cols-1 md:grid-cols-3 gap-10">

         
        <div className="flex flex-col items-center justify-center">
          <svg width="160" height="160">
            <circle
              cx="80"
              cy="80"
              r={RADIUS}
              stroke="#fbcfe8"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r={RADIUS}
              stroke="#ec4899"
              strokeWidth="12"
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              className="text-2xl font-bold fill-pink-600"
            >
              {progress}%
            </text>
          </svg>

          <p className="mt-3 text-sm text-gray-500">
            {completed} of {goals.length} completed
          </p>

          <p className="mt-6 text-m text-pink-600  ">
            You can complete this
          </p>
        </div>

         
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold text-pink-900 mb-6">
            {category.title}
          </h1>

           
          <div className="flex gap-3 mb-6">
            <input
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Add a new goal..."
              className="flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              onClick={addGoal}
              className="px-5 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
            >
              Add
            </button>
          </div>

           
          {goals.length === 0 ? (
            <p className="text-gray-400 italic">
              No goals yet. Start by adding one ✨
            </p>
          ) : (
            <ul className="space-y-4">
              {goals.map((goal) => (
                <li
                  key={goal.id}
                  className="flex items-center gap-4 bg-pink-50 rounded-xl p-4"
                >
                  <input
                    type="checkbox"
                    checked={goal.done}
                    onChange={() => toggleGoal(goal.id)}
                    className="w-5 h-5 accent-pink-500"
                  />

                  <span
                    className={`flex-1 ${
                      goal.done
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {goal.text}
                  </span>

                   
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-pink-400 hover:text-pink-600 text-lg"
                    title="Delete"
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsCategory;
