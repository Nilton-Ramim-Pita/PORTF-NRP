import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Depth3DCardProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  rotateIntensity?: number;
}

const Depth3DCard: React.FC<Depth3DCardProps> = ({
  children,
  className = '',
  depth = 30,
  rotateIntensity = 10,
}) => {
  return (
    <motion.div
      className={`depth-3d relative ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <motion.div
        className="depth-3d-child relative"
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{ 
          rotateX: 5, 
          rotateY: 5, 
          z: depth,
          transition: { type: 'spring', stiffness: 300, damping: 15 }
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Depth3DCard;