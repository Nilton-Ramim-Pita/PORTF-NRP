import React, { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementsProps {
  children: ReactNode;
  className?: string;
  count?: number;
  minSize?: number;
  maxSize?: number;
  colors?: string[];
  minDuration?: number;
  maxDuration?: number;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({
  children,
  className = '',
  count = 5, // Reduced count
  minSize = 10,
  maxSize = 20, // Reduced max size
  colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
  minDuration = 10,
  maxDuration = 20,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [elements, setElements] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Delay element creation to improve initial load time
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      const newElements = Array.from({ length: count }).map((_, i) => {
        const size = minSize + Math.random() * (maxSize - minSize);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = minDuration + Math.random() * (maxDuration - minDuration);
        const delay = Math.random() * 5;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              left: `${initialX}%`,
              top: `${initialY}%`,
            }}
            animate={{
              y: [0, -10, 0, 10, 0], // Reduced movement range
              x: [0, 7, 0, -7, 0], // Reduced movement range
              scale: [1, 1.05, 1, 0.95, 1], // Reduced scale change
            }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              delay,
            }}
          />
        );
      });
      
      setElements(newElements);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [count, minSize, maxSize, colors, minDuration, maxDuration]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isVisible && elements}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default FloatingElements;