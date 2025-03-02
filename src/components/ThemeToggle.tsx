import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 180 : 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      >
        {darkMode ? (
          <Sun className="w-6 h-6 text-[#fe2c55]" />
        ) : (
          <Moon className="w-6 h-6 text-[#25f4ee]" />
        )}
      </motion.div>
      
      {/* Animated ring */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{ 
          borderColor: darkMode ? "#fe2c55" : "#25f4ee",
          borderWidth: "2px"
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Animated glow */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{ 
          boxShadow: darkMode 
            ? "0 0 10px 2px rgba(254, 44, 85, 0.5)" 
            : "0 0 10px 2px rgba(37, 244, 238, 0.5)",
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          opacity: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      />
    </motion.button>
  );
};

export default ThemeToggle;