import React, { ReactNode, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'rotate' | 'none';
  distance?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 0.8,
  once = true,
  threshold = 0.1,
  staggerChildren = false,
  staggerDelay = 0.1
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
    rootMargin: '-50px 0px'
  });
  
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      
      // Add class for CSS-based animations
      if (sectionRef.current) {
        sectionRef.current.classList.add('in-view');
      }
    }
  }, [controls, inView]);

  const getInitialPosition = () => {
    // Use smaller distance values on mobile
    const isMobile = window.innerWidth <= 768;
    const mobileDistance = isMobile ? Math.min(30, distance / 2) : distance;
    
    switch (direction) {
      case 'up':
        return { y: mobileDistance };
      case 'down':
        return { y: -mobileDistance };
      case 'left':
        return { x: mobileDistance };
      case 'right':
        return { x: -mobileDistance };
      case 'zoom':
        return { scale: 0.9 };
      case 'rotate':
        return { rotate: -10, scale: 0.95 };
      case 'none':
        return { opacity: 0 };
      default:
        return { y: mobileDistance };
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
        staggerChildren: staggerChildren ? staggerDelay : 0,
        delayChildren: staggerChildren ? delay : 0
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={(node) => {
        // @ts-ignore - combining refs
        ref(node);
        sectionRef.current = node;
      }}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`${className} scroll-trigger`}
      data-animation={direction}
    >
      {staggerChildren ? (
        React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={childVariants}
            className="stagger-item"
          >
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
    </motion.div>
  );
};

export default AnimatedSection;