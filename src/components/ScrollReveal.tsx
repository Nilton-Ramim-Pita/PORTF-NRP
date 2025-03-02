import React, { ReactNode, useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 0.8,
  once = true,
  threshold = 0.1,
  staggerChildren = false,
  staggerDelay = 0.1,
}) => {
  const controls = useAnimation();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
    rootMargin: '-50px 0px',
  });
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay animations on initial load to prioritize core content
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (inView && shouldAnimate) {
      controls.start('visible');
      
      // Add storytelling effect classes
      if (elementRef.current) {
        elementRef.current.classList.add('visible');
      }
    }
  }, [inView, controls, shouldAnimate]);

  const getInitialPosition = () => {
    if (!shouldAnimate) return {};
    
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
      case 'none':
        return { scale: 0.95, opacity: 0 };
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
      transition: {
        duration,
        delay,
        ease: 'easeOut',
        staggerChildren: staggerChildren ? staggerDelay : 0,
        delayChildren: staggerChildren ? delay : 0,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Add appropriate story section class based on direction
  let storyClass = 'story-section';
  if (direction === 'left') storyClass = 'story-section-left';
  if (direction === 'right') storyClass = 'story-section-right';

  // If animations are disabled, render without motion effects
  if (!shouldAnimate) {
    return <div className={`${className} ${storyClass}`} ref={elementRef}>{children}</div>;
  }

  return (
    <motion.div
      ref={(node) => {
        // @ts-ignore - combining refs
        ref(node);
        elementRef.current = node;
      }}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`${className} ${storyClass} reveal-element`}
      style={{ overflow: 'visible' }}
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

export default ScrollReveal;