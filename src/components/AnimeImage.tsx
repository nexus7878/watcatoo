import React, { useState } from 'react';
import { Film } from 'lucide-react';

interface AnimeImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '2/3' | '16/9' | 'auto';
}

export const AnimeImage: React.FC<AnimeImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '2/3',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const aspectClass =
    aspectRatio === '2/3'
      ? 'aspect-[2/3]'
      : aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : '';

  return (
    <div className={`relative overflow-hidden bg-[#151A16] ${aspectClass} ${className}`}>
      {/* Shimmer loading skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-[#151A16] animate-pulse-subtle flex items-center justify-center">
          <Film className="w-8 h-8 text-[#262D28] animate-pulse" />
        </div>
      )}

      {error ? (
        /* Fallback placeholder */
        <div className="absolute inset-0 bg-gradient-to-b from-[#151A16] to-[#080A09] border border-[#262D28] p-4 flex flex-col items-center justify-center text-center">
          <Film className="w-8 h-8 text-[#39E66B]/50 mb-2" />
          <span className="text-xs font-medium text-[#A0AAA2] line-clamp-2 px-1">
            {alt}
          </span>
          <span className="text-[10px] text-[#A0AAA2]/60 mt-1 uppercase tracking-wider">
            Artwork Unavailable
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      )}
    </div>
  );
};
