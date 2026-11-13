import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  titleFallback: string;
  className?: string;
  priority?: boolean;
}

export function ResilientImage({
  src,
  alt,
  titleFallback,
  className = '',
  priority = false,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F3EFEA] via-[#EBE8E4] to-[#E5DFD7] text-[#56423D] p-6 text-center ${className}`}
      >
        <UtensilsCrossed className="w-7 h-7 text-[#9E3D24] mb-2.5 stroke-[1.5]" />
        <span className="font-editorial text-base font-medium text-[#1E1E1C] max-w-[18ch] leading-snug">
          {titleFallback}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
