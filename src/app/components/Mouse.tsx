import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useState, useEffect } from "react";
interface MouseProps {
  element?: React.RefObject<HTMLDivElement>;
}
const Mouse: React.FC<MouseProps> = ({ element }) => {
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };
  const [isHovered, setIsHovered] = useState(false);
  const cursorSize = isHovered ? 60 : 18;
  const offset = useMotionValue(cursorSize / 2);

  useEffect(() => {
    if (cursorSize === 60) offset.set(cursorSize / 2 + 7);
    else offset.set(cursorSize / 2);
  }, [cursorSize, offset]);

  const manageMouse = (e: MouseEvent) => {
  mouse.x.set(e.clientX - offset.get());
  mouse.y.set(e.clientY - offset.get());
};


  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 300, damping: 20, mass: 0.5 }),
    y: useSpring(mouse.y, { stiffness: 300, damping: 20, mass: 0.5 }),
  };
  const handleMouseMove = (e: MouseEvent) => {
    manageMouse(e);
  };
  const enterMouse = () => {
    setIsHovered(true);
  };
  const leaveMouse = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    const currentElement = element?.current;
    if (currentElement) {
      currentElement.addEventListener("mouseenter", enterMouse);
      currentElement.addEventListener("mouseleave", leaveMouse);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (currentElement) {
        currentElement.removeEventListener("mouseenter", enterMouse);
        currentElement.removeEventListener("mouseleave", leaveMouse);
      }
    };
  }, [element]);

  return (
    <motion.div
      className="hidden bg-black md:fixed backdrop-invert rounded-full pointer-events-none z-50 md:flex justify-center items-center"
      style={{
        x: smoothMouse.x,
        y: smoothMouse.y,
        mixBlendMode: isHovered ? "normal" : "difference",
        filter: isHovered ? "" : "invert(1)",
        backgroundColor: isHovered ? "white" : "black",
      }}
      animate={{ width: cursorSize, height: cursorSize, scale: 1 }}
    >
      <motion.div animate={{ opacity: isHovered ? 1 : 0 }}>Demo</motion.div>
    </motion.div>
  );
};

export default Mouse;