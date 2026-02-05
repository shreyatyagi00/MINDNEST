import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
const DEFAULT_CATEGORIES = {
  health: { title: "Health", goals: [] },
  career: { title: "Career", goals: [] },
  wealth: { title: "Wealth", goals: [] },
  lifestyle: { title: "Lifestyle", goals: [] },
  travel: { title: "Travel", goals: [] },
  family: { title: "Family", goals: [] },
  hobbies: { title: "Hobbies", goals: [] },
  knowledge: { title: "Knowledge", goals: [] },
  love: { title: "Others", goals: [] },
};

const GoalsBoard = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("mindnest-goals");

    if (!saved) {
      localStorage.setItem(
        "mindnest-goals",
        JSON.stringify(DEFAULT_CATEGORIES)
      );
      setCategories(DEFAULT_CATEGORIES);
    } else {
      setCategories(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex justify-center px-4 pt-10  pb-2 ">
      <BackButton to="/dashboard" />
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl   px-10 pt-4 pb-4">
        <h1 className="text-3xl font-bold text-center text-pink-900 mb-12">
          🌸 Vision Board
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {Object.entries(categories).map(([key, category]) => (
            <div
              key={key}
              onClick={() => navigate(`/goals/${key}`)}
              className="
                cursor-pointer
                bg-pink-50 hover:bg-pink-100
                transition
                rounded-2xl p-6
                shadow-md hover:shadow-lg
              "
            >
              <h2 className="text-lg font-semibold text-pink-900 mb-2">
                {category.title}
              </h2>

              <p className="text-sm text-pink-600 italic">
                Get started →
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 mt-5 text-sm">
          Make it happen ✨
        </p>
      </div>
    </div>
  );
};

export default GoalsBoard;
