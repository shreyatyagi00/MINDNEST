import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
      
      <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200  rounded-3xl shadow-xl   p-20 w-full max-w-md text-center ">
        <h1 className="text-3xl font-bold text-pink-900 mb-4">
          MindNest
        </h1>

        <p className="text-gray-600 mb-8">
          A safe space for your thoughts, plans & growth 🌱
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full py-3 rounded-full text-white font-semibold 
                     bg-gradient-to-r from-purple-400 to-pink-400
                     hover:from-purple-500 hover:to-pink-500
                     transition-all duration-300 shadow-md"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Landing;
