import React, { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  imageUrl: string;
  strength?: number;
  blur?: number;
  className?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  contentClassName?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  imageUrl,
  strength = 300,
  blur = 0,
  className = '',
  overlayColor = '#000000',
  overlayOpacity = 0.5,
  contentClassName = ''
}) => {
  const { scrollYProgress } = useScroll();
  
  // Transform the scroll progress into a parallax effect
  // The background moves slower than the content
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, strength]
  );
  
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Background with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          filter: blur > 0 ? `blur(${blur}px)` : 'none',
          y,
          zIndex: 0
        }}
      />
      
      {/* Overlay */}
      {overlayOpacity > 0 && (
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
            zIndex: 1
          }}
        />
      )}
      
      {/* Content */}
      <div className={`relative z-10 ${contentClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default ParallaxSection;