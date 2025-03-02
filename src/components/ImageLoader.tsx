import React, { useState } from 'react';

interface ImageLoaderProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  loading = 'lazy'
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}></div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default ImageLoader;