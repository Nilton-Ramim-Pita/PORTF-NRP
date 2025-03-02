import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InitialsAnimationAlternativeProps {
  onAnimationComplete: () => void;
}

const InitialsAnimationAlternative: React.FC<InitialsAnimationAlternativeProps> = ({ onAnimationComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    // Prevent scrolling during animation
    document.body.style.overflow = 'hidden';
    
    // Animation sequence timing
    const timings = [600, 600, 600, 1000, 800];
    
    // Set up timers for each step of the animation
    const timers: NodeJS.Timeout[] = [];
    
    let cumulativeTime = 0;
    for (let i = 0; i < timings.length; i++) {
      const timer = setTimeout(() => {
        setCurrentStep(i + 1);
        
        // When we reach the last step, call the completion callback
        if (i === timings.length - 1) {
          setTimeout(() => {
            document.body.style.overflow = '';
            onAnimationComplete();
          }, 500);
        }
      }, cumulativeTime);
      
      timers.push(timer);
      cumulativeTime += timings[i];
    }
    
    // Clean up timers on unmount
    return () => {
      timers.forEach(timer => clearTimeout(timer));
      document.body.style.overflow = '';
    };
  }, [onAnimationComplete]);
  
  // Letter variants for animation
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };
  
  // Container variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ 
        background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)'
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex items-center justify-center">
        <AnimatePresence>
          {currentStep >= 1 && currentStep < 5 && (
            <motion.div
              key="N"
              className="text-white font-bold text-9xl mx-3"
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              N
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {currentStep >= 2 && currentStep < 5 && (
            <motion.div
              key="R"
              className="text-white font-bold text-9xl mx-3"
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              R
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {currentStep >= 3 && currentStep < 5 && (
            <motion.div
              key="P"
              className="text-white font-bold text-9xl mx-3"
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              P
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Decorative particles that appear in step 4 */}
      {currentStep >= 4 && (
        <>
          {Array.from({ length: 20 }).map((_, i) => {
            const size = Math.random() * 10 + 5;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const duration = Math.random() * 1 + 0.5;
            const delay = Math.random() * 0.3;
            
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: size,
                  height: size,
                  left: '50%',
                  top: '50%',
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5]
                }}
                transition={{
                  duration: duration,
                  delay: delay,
                  ease: "easeOut"
                }}
              />
            );
          })}
        </>
      )}
    </motion.div>
  );
};

export default InitialsAnimationAlternative;