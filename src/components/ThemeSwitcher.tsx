import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeSwitcherProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ darkMode, toggleDarkMode }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Handle theme toggle with animation sequence
  const handleToggle = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // If switching to dark mode, show stars during transition
    if (!darkMode) {
      setTimeout(() => {
        toggleDarkMode();
        setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      }, 400);
    } else {
      // If switching to light mode
      toggleDarkMode();
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  };
  
  return (
    <div className="relative">
      {/* Theme toggle button */}
      <motion.button
        onClick={handleToggle}
        className={`relative overflow-hidden rounded-full w-12 h-6 flex items-center transition-colors ${
          isAnimating ? 'pointer-events-none' : ''
        } ${
          darkMode 
            ? 'bg-gray-700 justify-end' 
            : 'bg-blue-100 justify-start'
        }`}
        whileTap={{ scale: 0.9 }}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <motion.div 
          className={`w-5 h-5 rounded-full flex items-center justify-center relative z-10 ${
            darkMode ? 'bg-gray-900 text-yellow-300' : 'bg-yellow-400 text-yellow-800'
          }`}
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        >
          {darkMode ? (
            <Moon className="w-3 h-3" />
          ) : (
            <Sun className="w-3 h-3" />
          )}
        </motion.div>
        
        {/* Animated background effect */}
        <AnimatePresence>
          {darkMode ? (
            <motion.div
              key="sun-bg"
              className="absolute inset-0 bg-gradient-to-tr from-yellow-300 to-yellow-100 z-0"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isAnimating ? 1 : 0, scale: isAnimating ? 10 : 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.8 }}
            />
          ) : (
            <motion.div
              key="moon-bg"
              className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-purple-900 z-0"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isAnimating ? 1 : 0, scale: isAnimating ? 10 : 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ThemeSwitcher;