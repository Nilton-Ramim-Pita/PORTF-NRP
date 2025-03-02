import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    // Animation for SVG paths when component mounts
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll('path');
      
      paths.forEach((path, index) => {
        const length = path.getTotalLength();
        
        // Set initial state - path invisible
        path.style.strokeDasharray = length.toString();
        path.style.strokeDashoffset = length.toString();
        
        // Animate the path
        const animation = path.animate(
          [
            { strokeDashoffset: length },
            { strokeDashoffset: 0 }
          ],
          {
            duration: 1200,
            delay: index * 150,
            fill: 'forwards',
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }
        );
        
        // Clean up animation on unmount
        return () => {
          animation.cancel();
        };
      });
    }
  }, []);

  return (
    <div className="flex items-center">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <svg 
          ref={svgRef}
          width="40" 
          height="40" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-lg"
        >
          {/* Background Circle */}
          <circle 
            cx="50" 
            cy="50" 
            r="48" 
            fill="#121212" 
            className="dark:fill-gray-900"
          />
          
          {/* Decorative Circuit Lines */}
          <path 
            d="M20 50 H30 M70 50 H80 M50 20 V30 M50 70 V80" 
            stroke="#25f4ee" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            className="opacity-60"
          />
          
          <path 
            d="M25 25 L35 35 M65 65 L75 75 M25 75 L35 65 M65 35 L75 25" 
            stroke="#25f4ee" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            className="opacity-60"
          />
          
          {/* Letter N */}
          <path 
            d="M30 35 V65 L45 35 V65" 
            stroke="#fe2c55" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="fill-none"
          />
          
          {/* Letter R */}
          <path 
            d="M50 35 V65 M50 35 C58 35 58 50 50 50 C58 50 65 65 65 65" 
            stroke="#fe2c55" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="fill-none"
          />
          
          {/* Letter P */}
          <path 
            d="M70 35 V65 M70 35 C78 35 78 50 70 50" 
            stroke="#fe2c55" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="fill-none"
          />
          
          {/* Glow Effect */}
          <circle 
            cx="50" 
            cy="50" 
            r="48" 
            stroke="#25f4ee" 
            strokeWidth="1" 
            className="opacity-70"
          />
        </svg>
        
        {/* Animated Glow */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-[#fe2c55] dark:bg-[#fe2c55] opacity-20 blur-md -z-10"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
      
      <motion.span 
        className="ml-3 text-xl font-bold tiktok-gradient-text"
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Nilton Pita
      </motion.span>
    </div>
  );
};

export default Logo;