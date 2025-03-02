import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface MouseTrailEffectProps {
  darkMode?: boolean;
}

const MouseTrailEffect: React.FC<MouseTrailEffectProps> = ({ darkMode = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button') ||
          target.classList.contains('clickable')) {
        setCursorVariant("hover");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      opacity: 0.5,
      height: 40,
      width: 40,
      borderColor: darkMode ? "#64ffda" : "#3b82f6"
    },
    hover: {
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
      opacity: 0.8,
      height: 50,
      width: 50,
      borderColor: darkMode ? "#64ffda" : "#3b82f6"
    }
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      backgroundColor: darkMode ? "#64ffda" : "#3b82f6"
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      backgroundColor: darkMode ? "#64ffda" : "#3b82f6",
      scale: 1.5
    }
  };

  // Only show on desktop
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="cursor-effect"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        ref={dotRef}
        className="cursor-dot"
        variants={dotVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 800, damping: 28 }}
      />
    </>
  );
};

export default MouseTrailEffect;