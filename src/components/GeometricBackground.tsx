import React, { useEffect, useRef } from 'react';

interface GeometricBackgroundProps {
  className?: string;
  color?: string;
  darkMode?: boolean;
  density?: number;
  speed?: number;
}

const GeometricBackground: React.FC<GeometricBackgroundProps> = ({
  className = '',
  color = '#3b82f6',
  darkMode = false,
  density = 15, // Reduced density
  speed = 0.2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgColor = darkMode ? 'rgba(31, 41, 55, 0)' : 'rgba(249, 250, 251, 0)';
  const lineColor = darkMode ? '#ffffff' : color;
  const animationRef = useRef<number>();
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Points array
    const points: { x: number; y: number; vx: number; vy: number }[] = [];
    
    // Create points
    const createPoints = () => {
      points.length = 0;
      // Calculate point count based on screen size and density
      // Lower density for better performance
      const pointCount = Math.min(
        100, // Cap maximum points
        Math.floor((width * height) / (20000 / density))
      );
      
      for (let i = 0; i < pointCount; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed
        });
      }
    };
    
    // Draw function with performance optimizations
    const draw = () => {
      if (!isVisibleRef.current) return;
      
      // Clear canvas
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      
      // Update points
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        
        // Move point
        point.x += point.vx;
        point.y += point.vy;
        
        // Bounce off edges
        if (point.x < 0 || point.x > width) point.vx = -point.vx;
        if (point.y < 0 || point.y > height) point.vy = -point.vy;
        
        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = lineColor;
        ctx.fill();
      }
      
      // Connect points - only check nearby points for better performance
      const connectionDistance = 120; // Reduced connection distance
      
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        
        for (let j = i + 1; j < points.length; j++) {
          const point2 = points[j];
          const dx = point.x - point2.x;
          const dy = point.y - point2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(point2.x, point2.y);
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = 1 - (distance / connectionDistance);
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createPoints();
    };
    
    // Visibility change handler to pause animation when tab is not visible
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
      
      if (isVisibleRef.current) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(draw);
      }
    };
    
    // Intersection observer to pause animation when not in viewport
    const observer = new IntersectionObserver((entries) => {
      isVisibleRef.current = entries[0].isIntersecting;
      
      if (isVisibleRef.current) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(draw);
      }
    }, { threshold: 0.1 });
    
    observer.observe(canvas);
    
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    createPoints();
    animationRef.current = requestAnimationFrame(draw);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [darkMode, color, density, speed, bgColor, lineColor]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default GeometricBackground;