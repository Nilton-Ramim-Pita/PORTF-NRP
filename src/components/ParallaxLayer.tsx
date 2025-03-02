import React, { ReactNode, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ 
  children, 
  speed = 0.3, // Reduced speed
  className = ''
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed]);

  useEffect(() => {
    // Check if device is likely a mobile/tablet with lower performance
    const isMobile = window.innerWidth <= 768;
    
    // Enable parallax only on desktop devices for better performance
    setIsEnabled(!isMobile);
  }, []);

  if (!isEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;