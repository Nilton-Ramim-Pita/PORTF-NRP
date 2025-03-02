import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface InitialsAnimationAdvancedProps {
  onAnimationComplete: () => void;
}

const InitialsAnimationAdvanced: React.FC<InitialsAnimationAdvancedProps> = ({ onAnimationComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Prevent scrolling during animation
    document.body.style.overflow = 'hidden';
    
    if (containerRef.current) {
      const container = containerRef.current;
      const letters = container.querySelectorAll('.letter');
      const particles = container.querySelectorAll('.particle');
      
      // Set initial state
      gsap.set(letters, { 
        opacity: 0,
        y: 50,
        scale: 0.5
      });
      
      gsap.set(particles, {
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0
      });
      
      // Create animation timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Enable scrolling after animation
          document.body.style.overflow = '';
          // Call the callback
          onAnimationComplete();
        }
      });
      
      // Animate each letter
      tl.to(letters, { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      })
      .to(particles, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out"
      }, "-=0.4")
      .to(particles, {
        x: (i) => (Math.random() - 0.5) * 200,
        y: (i) => (Math.random() - 0.5) * 200,
        opacity: 0,
        duration: 1.5,
        stagger: 0.02,
        ease: "power2.out"
      }, "-=0.2")
      .to(letters, {
        opacity: 0,
        y: -50,
        scale: 1.5,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.in"
      }, "-=0.8")
      .to(container, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      }, "-=0.4");
    }
    
    return () => {
      // Cleanup - ensure scrolling is enabled when component unmounts
      document.body.style.overflow = '';
    };
  }, [onAnimationComplete]);
  
  // Generate particles
  const renderParticles = () => {
    const particles = [];
    const colors = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#FFFFFF'];
    
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 10 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particles.push(
        <div 
          key={i}
          className="particle absolute rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      );
    }
    
    return particles;
  };
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ 
        background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)'
      }}
    >
      <div className="relative flex items-center justify-center">
        {renderParticles()}
        
        <div className="flex items-center justify-center relative z-10">
          <div className="letter text-white font-bold text-9xl mx-2 filter drop-shadow-lg">N</div>
          <div className="letter text-white font-bold text-9xl mx-2 filter drop-shadow-lg">R</div>
          <div className="letter text-white font-bold text-9xl mx-2 filter drop-shadow-lg">P</div>
        </div>
      </div>
    </div>
  );
};

export default InitialsAnimationAdvanced;