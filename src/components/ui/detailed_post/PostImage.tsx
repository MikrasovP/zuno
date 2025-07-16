import { useState } from "react";
import { cn } from "@/utils/utils";
import { Loader2 } from "lucide-react";

export default function PostImage({
    image,
    containerClassName = "px-4 lg:px-12 xl:px-16 2xl:px-24",
    fallbackSrc = "/post-image-placeholder.svg",
    alt = "Post Image",
    showLoadingSpinner = true,
}: {
    image: string,
    containerClassName?: string,
    fallbackSrc?: string,
    alt?: string,
    showLoadingSpinner?: boolean,
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoad = () => setIsLoading(false);
    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setError(true);
        setIsLoading(false);
        if (fallbackSrc) {
            (e.target as HTMLImageElement).src = fallbackSrc;
        }
    };

    // Fixed height classes
    const fixedHeight = "h-[200px] lg:h-[240px] xl:h-[320px]";

    return (
        <div className={cn("w-full flex justify-center mb-6 relative", fixedHeight, containerClassName)}>
            {/* Loading State */}
            {isLoading && showLoadingSpinner && (
                <div className={cn("absolute inset-0 flex items-center justify-center bg-white/60 z-10 w-full", fixedHeight)}>
                    <Loader2 className="h-10 w-10 animate-spin text-neutral-400" />
                </div>
            )}
            {/* Error State (if no fallbackSrc) */}
            {error && !fallbackSrc && (
                <div className={cn("absolute inset-0 flex items-center justify-center bg-neutral-100/80 z-10 w-full", fixedHeight)}>
                    <span className="text-neutral-400">Image not available</span>
                </div>
            )}
            <img
                src={image}
                alt={alt}
                className={cn(
                    "w-full object-contain transition-opacity duration-300",
                    fixedHeight,
                    isLoading ? "opacity-0" : "opacity-100"
                )}
                onLoad={handleLoad}
                onError={handleError}
                loading="lazy"
                decoding="async"
            />
        </div>
    );
}