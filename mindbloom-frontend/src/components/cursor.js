import { useEffect } from "react";
import styles from "./Cursor.module.css"; 

const Cursor = () => {
  useEffect(() => {
    const cursor = document.createElement("div");
    const cursorTrail = document.createElement("div");
    cursor.classList.add(styles.cursor);
    cursorTrail.classList.add(styles.cursorTrail);

    document.body.appendChild(cursor);
    document.body.appendChild(cursorTrail);

    let trailTimeout;

    const updateCursor = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      cursor.style.left = `${mouseX - cursor.offsetWidth / 2}px`;
      cursor.style.top = `${mouseY - cursor.offsetHeight / 2}px`;

      cursorTrail.style.left = `${mouseX - cursorTrail.offsetWidth / 2}px`;
      cursorTrail.style.top = `${mouseY - cursorTrail.offsetHeight / 2}px`;

      clearTimeout(trailTimeout);
      trailTimeout = setTimeout(() => {
        cursorTrail.style.opacity = "0";
      }, 100);

      cursorTrail.style.opacity = "1";
    };

    window.addEventListener("mousemove", updateCursor);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      cursor.remove();          
      cursorTrail.remove();    
    };
  }, []);

  return null;
};

export default Cursor;
