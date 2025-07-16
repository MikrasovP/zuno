import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/utils/utils';

export default function PostContent({
    markdownContent,
    containerClassName = "",
}: { markdownContent: string, containerClassName?: string }) {
    return (
        <div className={cn("w-full", containerClassName)}>
            <div className={"prose lg:prose-lg"}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
            </div>
        </div>
    );
};