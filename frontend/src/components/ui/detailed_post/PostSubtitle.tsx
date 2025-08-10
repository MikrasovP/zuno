import { cn } from "@/utils/utils";

export default function PostSubtitle({
    subtitle,
    containerClassName,
}: { subtitle: string, containerClassName?: string }) {
    return (
        <div className={cn("w-full flex justify-center mb-6", containerClassName)}>
            <h2 className="text-lg md:text-xl font-medium text-center text-neutral-600 tracking-normal leading-snug italic">
                {subtitle}
            </h2>
        </div>
    );
} 