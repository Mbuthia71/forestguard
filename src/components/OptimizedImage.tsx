import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy' 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};
