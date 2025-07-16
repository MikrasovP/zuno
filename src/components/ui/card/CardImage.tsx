import { useState } from 'react';
import { cn } from '@/utils/utils';
import { Loader2 } from 'lucide-react';

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
  emptyImageSrc?: string;
  containerClassName?: string;
  loaderClassName?: string;
  errorClassName?: string;
  showLoadingSpinner?: boolean;
  renderError?: (error: Error) => React.ReactNode;
}

export function CardImage({
  src,
  alt,
  fallbackSrc = '/post-image-placeholder.svg',
  emptyImageSrc = '/post-image-placeholder.svg',
  className,
  containerClassName,
  loaderClassName,
  errorClassName,
  showLoadingSpinner = true,
  ...props
}: CardImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setError(new Error('Failed to load image'));
    setIsLoading(false);
    if (fallbackSrc) {
      (e.target as HTMLImageElement).src = fallbackSrc;
    }
  };

  return (
    <div
      className={cn(
        'w-[220px] h-[100px] relative overflow-hidden rounded-lg bg-muted p-8',
        containerClassName
      )}
    >
      {/* Loading State */}
      {isLoading && showLoadingSpinner && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center bg-muted',
            'transition-opacity duration-300',
            isLoading ? 'opacity-100' : 'opacity-0',
            loaderClassName
          )}
        >
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Error State */}
      {error && !fallbackSrc && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center bg-muted/50',
            errorClassName
          )}
        />
      )}

      {/* Image */}
      <img
        src={src ? src : emptyImageSrc}
        alt={alt}
        className={cn(
          'absolute inset-0 h-full w-full object-cover',
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className 
        )}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
} 