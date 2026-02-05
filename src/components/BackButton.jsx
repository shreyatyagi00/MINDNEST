import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BackButton = ({ to }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <button
      onClick={() => navigate(to)}
      title="Back"
      className={`
        fixed top-6 left-6 z-50
        w-10 h-10 rounded-full
        flex items-center justify-center
        bg-white/20 backdrop-blur-md
        text-white text-lg shadow-lg

        transition-all duration-500 ease-out
        ${show ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-6 scale-90"}

        hover:bg-white/30 hover:scale-110
        active:scale-95
      `}
    >
      ←
    </button>
  );
};

export default BackButton;
