import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleEffectProps {
  darkMode: boolean;
}

const ThemeToggleEffect: React.FC<ThemeToggleEffectProps> = ({ darkMode }) => {
  const [showEffect, setShowEffect] = useState(false);
  const [prevDarkMode, setPrevDarkMode] = useState(darkMode);
  
  useEffect(() => {
    // Only show effect when theme changes, not on initial render
    if (prevDarkMode !== darkMode) {
      setShowEffect(true);
      
      // Hide effect after animation completes
      const timer = setTimeout(() => {
        setShowEffect(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
    
    setPrevDarkMode(darkMode);
  }, [darkMode, prevDarkMode]);
  
  if (!showEffect) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Center circle */}
        <motion.div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full ${
            darkMode ? 'bg-[#121212]' : 'bg-white'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 20 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        
        {/* Particles */}
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 6 + 2;
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 100 + 50;
          const duration = Math.random() * 1 + 0.5;
          const delay = Math.random() * 0.3;
          const color = darkMode ? '#25f4ee' : '#fe2c55';
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{ 
                width: size, 
                height: size,
                backgroundColor: color
              }}
              initial={{ 
                x: '-50%',
                y: '-50%',
                opacity: 0,
                scale: 0,
                top: '50%',
                left: '50%'
              }}
              animate={{ 
                x: `calc(-50% + ${Math.cos(angle) * distance}px)`,
                y: `calc(-50% + ${Math.sin(angle) * distance}px)`,
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration,
                delay,
                ease: "easeOut"
              }}
            />
          );
        })}
        
        {/* Icons that fly in from edges */}
        {darkMode ? (
          // Stars and moon for dark mode
          <>
            {Array.from({ length: 10 }).map((_, i) => {
              const size = Math.random() * 10 + 5;
              const startX = Math.random() > 0.5 ? -100 : window.innerWidth + 100;
              const startY = Math.random() * window.innerHeight;
              const endX = Math.random() * window.innerWidth;
              const endY = Math.random() * window.innerHeight;
              const delay = Math.random() * 0.5;
              
              return (
                <motion.div
                  key={`star-${i}`}
                  className="absolute text-[#25f4ee]"
                  style={{ 
                    fontSize: size,
                    left: startX,
                    top: startY
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    left: endX,
                    top: endY,
                    rotate: 360
                  }}
                  transition={{
                    duration: 1.5,
                    delay,
                    ease: "easeOut"
                  }}
                >
                  ✦
                </motion.div>
              );
            })}
          </>
        ) : (
          // Sun rays for light mode
          <>
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const length = Math.random() * 100 + 50;
              
              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute top-1/2 left-1/2 bg-[#fe2c55]"
                  style={{ 
                    height: 2,
                    width: 1,
                    transformOrigin: 'left center',
                    rotate: `${angle}rad`,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ 
                    scaleX: length,
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2,
                    ease: "easeOut"
                  }}
                />
              );
            })}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeToggleEffect;