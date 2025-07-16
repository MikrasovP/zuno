import { cn } from "@/utils/utils";

export default function PostTitle({
    title,
    containerClassName = "",
}: { title: string, containerClassName?: string }) {
    return (
        <div className={cn("w-full flex justify-center mt-6 mb-4", containerClassName)}>
            <h1 className="text-4xl md:text-5xl font-bold 
                text-center text-neutral-900 tracking-tight leading-tight">
                {title}
            </h1>
        </div>
    );
}