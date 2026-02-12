import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { useRef } from "react";
import useSwipeBackWithAnimation from "../hooks/useSwipeBackWithAnimation";


const Todo = () => {
  const pageRef = useRef(null);
useSwipeBackWithAnimation("/dashboard", pageRef);

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("mindnest-todos");
    return saved ? JSON.parse(saved) : [];
  });

   
  const addTodo = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    setTodos([
      {
        id: Date.now(),
        text: task,
        done: false,
      },
      ...todos,
    ]);
    setTask("");
  };

   
  const toggleDone = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

   
  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

   
  useEffect(() => {
    localStorage.setItem("mindnest-todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 px-4">
      <BackButton to="/dashboard" />

      <div className="flex justify-center">
        <div className="mt-20 w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
          <h1 className="text-2xl font-bold text-center text-pink-900 mb-6">
            To Do List
          </h1>

           
          <form
            onSubmit={addTodo}
            className="flex gap-3 mb-6"
          >
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Add a task..."
              className="flex-1 border border-purple-300 px-4 py-2 rounded-xl border focus:ring-2 focus:ring-purple-300"
            />

            <button
              className="
                w-12 h-12 rounded-xl
                bg-gradient-to-r from-purple-300 to-amber-400
                text-white text-xl
               hover:from-purple-400 hover:to-yellow-500
              transition

              "
            >
              +
            </button>
          </form>

           
          <div className="flex flex-col gap-3">
            {[...todos]
              .sort((a, b) => Number(a.done) - Number(b.done))
              .map((t) => (
                <div
                  key={t.id}
                  className={`
                    flex items-center justify-between
                    px-4 py-2 rounded-xl border
                    transition-all duration-300 ease-in-out
                    border border-purple-200  
                    ${t.done
                      ? "opacity-50 scale-[0.97]"
                      : "opacity-100"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() => toggleDone(t.id)}
                      className="w-5 h-5 accent-purple-400"
                    />

                    <span
                      className={`
                        transition-all duration-300
                        ${t.done
                          ? "line-through text-gray-400"
                          : "text-gray-700"}
                      `}
                    >
                      {t.text}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteTodo(t.id)}
                    className="text-gray-400 hover:text-red-400 transition"
                  >
                    🗑
                  </button>
                </div>
              ))}
          </div>

          
          {todos.length === 0 && (
            <p className="text-center text-gray-400 mt-6">
              No tasks yet 🌸
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
