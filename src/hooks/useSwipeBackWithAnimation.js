import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const EDGE = 24;
const TRIGGER = 120;
const MAX_VERTICAL = 80;

export default function useSwipeBackWithAnimation(to, pageRef) {
  const navigate = useNavigate();

  const startX = useRef(0);
  const startY = useRef(0);
  const swiping = useRef(false);

  useEffect(() => {
    if (!pageRef?.current) return;  

    const page = pageRef.current;

    const onTouchStart = (e) => {
      const t = e.touches[0];
      if (t.clientX <= EDGE) {
        swiping.current = true;
        startX.current = t.clientX;
        startY.current = t.clientY;
        page.style.transition = "none";
      }
    };

    const onTouchMove = (e) => {
      if (!swiping.current) return;

      const t = e.touches[0];
      const dx = t.clientX - startX.current;
      const dy = Math.abs(t.clientY - startY.current);

      if (dy > MAX_VERTICAL) {
        swiping.current = false;
        page.style.transform = "";
        page.style.opacity = "";
        return;
      }

      if (dx > 0) {
        page.style.transform = `translateX(${dx}px)`;
        page.style.opacity = `${1 - dx / 400}`;
      }
    };

    const onTouchEnd = (e) => {
      if (!swiping.current) return;
      swiping.current = false;

      const dx = e.changedTouches[0].clientX - startX.current;
      page.style.transition = "transform 0.3s ease, opacity 0.3s ease";

      if (dx > TRIGGER) {
        page.style.transform = "translateX(100%)";
        page.style.opacity = "0";
        setTimeout(() => navigate(to), 300);
      } else {
        page.style.transform = "translateX(0)";
        page.style.opacity = "1";
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [navigate, to, pageRef]);
}
