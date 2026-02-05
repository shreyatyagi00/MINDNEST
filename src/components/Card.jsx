import React from "react";

const Card = ({
  id,
  title,
  content,
  done,
  archived,
  createdAt,
  currentFilter,
  toggleDone,
  toggleArchive,
  deleteHandler,
}) => {
  return (
    <div
      className="
        w-full max-w-sm bg-white rounded-2xl p-5
        shadow-md
        hover:shadow-xl hover:bg-white/95
        transition-all duration-300
      "
    >
       
      <h3
        className={`font-semibold ${
          done ? "line-through text-gray-400" : "text-pink-900"
        }`}
      >
        {title}
      </h3>

      
      <div className="w-10 h-[2px] bg-pink-200 my-2 rounded-full" />

       
      <p
  className={`text-sm leading-relaxed break-words whitespace-pre-wrap ${
    done ? "line-through text-gray-400" : "text-gray-600"
  }`}
>
  {content}
</p>


      
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-400">
          {new Date(createdAt).toDateString()}
        </span>

        <div className="flex gap-2">
           
          <button
            onClick={() => toggleDone(id)}
            title={done ? "Un-complete" : "Complete"}
            className="
              w-8 h-8 rounded-full
              bg-green-100 text-green-700
              hover:bg-green-200 hover:shadow-sm
              active:opacity-90
              transition-all duration-200
            "
          >
            {done ? "↩" : "✓"}
          </button>

           
          {!archived && !done && currentFilter === "notes" && (
            <button
              onClick={() => toggleArchive(id)}
              title="Archive"
              className="
                w-8 h-8 rounded-full
                bg-pink-100 text-pink-700
                hover:bg-pink-200 hover:shadow-sm
                active:opacity-90
                transition-all duration-200
              "
            >
              📌
            </button>
          )}

           
          {archived && (
            <button
              onClick={() => toggleArchive(id)}
              title="Unarchive"
              className="
                w-8 h-8 rounded-full
                bg-blue-100 text-blue-700
                hover:bg-blue-200 hover:shadow-sm
                active:opacity-90
                transition-all duration-200
              "
            >
              ↩
            </button>
          )}

           
          <button
            onClick={() => deleteHandler(id)}
            title="Delete"
            className="
              w-8 h-8 rounded-full
              bg-red-100 text-red-600
              hover:bg-red-200 hover:shadow-sm
              active:opacity-90
              transition-all duration-200
            "
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
