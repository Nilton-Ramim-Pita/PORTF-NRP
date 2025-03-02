import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface InitialsAnimationProps {
  onAnimationComplete: () => void;
}

const InitialsAnimation: React.FC<InitialsAnimationProps> = ({ onAnimationComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0); // 0: initial, 1: letters appearing, 2: morphing, 3: subtitle, 4: complete
  const [typedText, setTypedText] = useState('');
  const fullText = 'Profissional de TI & Desenvolvedor';
  
  useEffect(() => {
    // Prevent scrolling during animation
    document.body.style.overflow = 'hidden';
    
    // Timeline for animation stages
    const stageTimers: NodeJS.Timeout[] = [];
    
    // After 0.5 seconds, letters start appearing
    stageTimers.push(setTimeout(() => {
      setStage(1);
    }, 500));
    
    // After 2.5 seconds, letters start morphing
    stageTimers.push(setTimeout(() => {
      setStage(2);
    }, 2500));
    
    // After 3.5 seconds, subtitle starts typing
    stageTimers.push(setTimeout(() => {
      setStage(3);
      
      // Typewriter effect for subtitle
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          
          // After typing completes, wait a bit and then complete animation
          setTimeout(() => {
            setStage(4);
            setTimeout(() => {
              document.body.style.overflow = '';
              onAnimationComplete();
            }, 1000);
          }, 800);
        }
      }, 50);
      
      // Clean up typing interval if component unmounts
      return () => clearInterval(typingInterval);
    }, 3500));
    
    return () => {
      // Cleanup - ensure scrolling is enabled when component unmounts
      document.body.style.overflow = '';
      stageTimers.forEach(timer => clearTimeout(timer));
    };
  }, [onAnimationComplete, fullText]);
  
  // Letter variants for staggered appearance
  const letterVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.5 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: custom * 0.2,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    morphing: (custom: number) => ({
      rotateY: [0, 10, -10, 0],
      rotateX: [0, 5, -5, 0],
      scale: [1, 1.1, 0.9, 1],
      transition: {
        delay: custom * 0.1,
        duration: 1.2,
        ease: "easeInOut"
      }
    }),
    exit: {
      opacity: 0,
      scale: 1.5,
      filter: "blur(10px)",
      transition: {
        duration: 0.8
      }
    }
  };
  
  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #121212 0%, #fe2c55 100%)'
      }}
      exit={{ opacity: 0 }}
    >
      {/* TikTok-style animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ 
            backgroundImage: 'linear-gradient(#25f4ee 1px, transparent 1px), linear-gradient(to right, #25f4ee 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Animated shapes */}
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-[#fe2c55] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#25f4ee] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 4 + 2;
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          const duration = Math.random() * 20 + 10;
          const delay = Math.random() * 5;
          const color = Math.random() > 0.5 ? '#fe2c55' : '#25f4ee';
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                backgroundColor: color,
                left: `${initialX}%`,
                top: `${initialY}%`,
                opacity: Math.random() * 0.5 + 0.2
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 40 - 20, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay
              }}
            />
          );
        })}
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* NRP Letters */}
        <div className="flex items-center mb-8">
          {['N', 'R', 'P'].map((letter, index) => (
            <motion.div
              key={letter}
              className="relative mx-4"
              initial="hidden"
              animate={stage >= 1 ? (stage >= 2 ? "morphing" : "visible") : "hidden"}
              exit="exit"
              variants={letterVariants}
              custom={index}
            >
              <span className="text-7xl md:text-9xl font-bold text-white filter drop-shadow-lg">
                {letter}
              </span>
              
              {/* Glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-white opacity-0"
                animate={stage >= 1 ? {
                  opacity: [0, 0.5, 0],
                  scale: [0.8, 1.2, 0.8]
                } : {}}
                transition={{
                  duration: 2,
                  delay: index * 0.2 + 0.3,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Subtitle with typewriter effect */}
        {stage >= 3 && (
          <motion.div
            className="text-xl md:text-2xl text-white font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="relative">
              {typedText}
              <motion.span 
                className="absolute top-0 right-0 w-0.5 h-full bg-white"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </span>
          </motion.div>
        )}
      </div>
      
      {/* Final fade out effect */}
      {stage >= 4 && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#fe2c55] to-[#25f4ee]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      )}
    </motion.div>
  );
};

export default InitialsAnimation;