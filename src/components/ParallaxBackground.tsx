import React, { ReactNode } from 'react';
import { Parallax } from 'react-parallax';

interface ParallaxBackgroundProps {
  children: ReactNode;
  imageUrl: string;
  strength?: number;
  className?: string;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ 
  children, 
  imageUrl,
  strength = 300,
  className = ''
}) => {
  return (
    <Parallax
      bgImage={imageUrl}
      strength={strength}
      className={className}
    >
      {children}
    </Parallax>
  );
};

export default ParallaxBackground;