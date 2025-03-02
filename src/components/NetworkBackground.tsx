import React, { useEffect, useRef } from 'react';

interface NetworkBackgroundProps {
  className?: string;
  darkMode?: boolean;
  pointCount?: number;
  lineDistance?: number;
  pointSize?: number;
  speed?: number;
  interactive?: boolean;
}

const NetworkBackground: React.FC<NetworkBackgroundProps> = ({
  className = '',
  darkMode = false,
  pointCount = 70,
  lineDistance = 150,
  pointSize = 2,
  speed = 0.3,
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const isVisibleRef = useRef(true);
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 });
  const pointsRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    pulseSpeed: number;
    pulseDirection: number;
  }>>([]);

  // Colors based on dark mode
  const bgColor = darkMode ? 'rgba(18, 18, 18, 0)' : 'rgba(248, 250, 252, 0)';
  const pointColor = darkMode ? '#ffffff' : '#121212';
  const lineColor = darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(18, 18, 18, 0.2)';
  const highlightColor = darkMode ? '#25f4ee' : '#fe2c55';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    setCanvasDimensions();

    // Initialize points
    const initPoints = () => {
      pointsRef.current = [];
      // Adjust point count based on screen size for better performance
      const adjustedPointCount = Math.min(
        pointCount,
        Math.floor((window.innerWidth * window.innerHeight) / 15000)
      );

      for (let i = 0; i < adjustedPointCount; i++) {
        pointsRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: Math.random() * pointSize + 1,
          opacity: Math.random() * 0.5 + 0.2,
          pulseSpeed: Math.random() * 0.01 + 0.005,
          pulseDirection: 1
        });
      }
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // Animation function
    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw points
      for (let i = 0; i < pointsRef.current.length; i++) {
        const point = pointsRef.current[i];
        
        // Update position
        point.x += point.vx;
        point.y += point.vy;
        
        // Bounce off edges
        if (point.x < 0 || point.x > window.innerWidth) point.vx = -point.vx;
        if (point.y < 0 || point.y > window.innerHeight) point.vy = -point.vy;
        
        // Pulse effect
        point.opacity += point.pulseSpeed * point.pulseDirection;
        if (point.opacity >= 0.7 || point.opacity <= 0.2) {
          point.pulseDirection *= -1;
        }
        
        // Check if point is near mouse
        let isNearMouse = false;
        if (interactive) {
          const dx = mouseRef.current.x - point.x;
          const dy = mouseRef.current.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRef.current.radius) {
            isNearMouse = true;
            // Move away from mouse slightly
            point.x += dx * 0.02;
            point.y += dy * 0.02;
          }
        }
        
        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = isNearMouse ? highlightColor : pointColor;
        ctx.globalAlpha = point.opacity;
        ctx.fill();
      }
      
      // Draw connections between points
      for (let i = 0; i < pointsRef.current.length; i++) {
        const point1 = pointsRef.current[i];
        
        for (let j = i + 1; j < pointsRef.current.length; j++) {
          const point2 = pointsRef.current[j];
          
          const dx = point1.x - point2.x;
          const dy = point1.y - point2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < lineDistance) {
            // Calculate opacity based on distance
            const opacity = 1 - (distance / lineDistance);
            
            ctx.beginPath();
            ctx.moveTo(point1.x, point1.y);
            ctx.lineTo(point2.x, point2.y);
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = opacity * 0.5;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Visibility change handler
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
    };

    // Intersection observer to pause animation when not in viewport
    const observer = new IntersectionObserver((entries) => {
      isVisibleRef.current = entries[0].isIntersecting;
    }, { threshold: 0.1 });
    
    observer.observe(canvas);
    
    window.addEventListener('resize', setCanvasDimensions);
    window.addEventListener('resize', initPoints);
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    initPoints();
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('resize', initPoints);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [darkMode, pointCount, lineDistance, pointSize, speed, interactive, pointColor, lineColor, highlightColor, bgColor]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default NetworkBackground;