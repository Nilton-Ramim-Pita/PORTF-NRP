import React, { ReactNode } from 'react';
import { Parallax as ReactParallax } from 'react-parallax';

interface CustomParallaxProps {
  bgImage: string;
  strength?: number;
  bgImageStyle?: React.CSSProperties;
  className?: string;
  children: ReactNode;
}

const CustomParallax: React.FC<CustomParallaxProps> = ({
  bgImage,
  strength = 300,
  bgImageStyle,
  className = '',
  children
}) => {
  // Check if we're on a mobile device
  const isMobile = window.innerWidth <= 768;
  
  // Reduce parallax strength on mobile for better performance
  const mobileStrength = isMobile ? Math.min(100, strength / 2) : strength;
  
  // Default styles to ensure proper rendering
  const defaultBgImageStyle = {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    ...bgImageStyle
  };
  
  return (
    <ReactParallax
      bgImage={bgImage}
      strength={mobileStrength}
      bgImageStyle={defaultBgImageStyle}
      className={`w-full max-w-full overflow-hidden ${className}`}
      bgImageSizes="100vw"
      renderLayer={(percentage) => (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: `rgba(0, 0, 0, ${0.5 - percentage * 0.1})`,
          }}
        />
      )}
    >
      <div className="w-full max-w-full overflow-hidden">
        {children}
      </div>
    </ReactParallax>
  );
};

export default CustomParallax;