import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the theme context type
type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider component to wrap the application
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize dark mode state from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      // Check if user has a preference in localStorage
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      // Check if user has a system preference for dark mode
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Update localStorage and apply class to document when dark mode changes
  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    // Apply or remove dark class on document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Provide the theme context to children
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};