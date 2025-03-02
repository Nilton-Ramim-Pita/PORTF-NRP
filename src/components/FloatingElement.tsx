import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ 
  children, 
  className = '',
  amplitude = 10,
  duration = 4,
  delay = 0
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0, amplitude, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;