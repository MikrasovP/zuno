import { Post } from "@/data/model/Post";
import PostContent from "../detailed_post/PostContent";
import PostTitle from "../detailed_post/PostTitle";
import PostSubtitle from "../detailed_post/PostSubtitle";
import PostImage from "../detailed_post/PostImage";

interface PostPreviewProps {
    title: string;
    description: string;
    content: string;
    imageSrc: string;
    author: {
        username: string;
        imageSrc: string;
    };
}

export default function PostPreview({
    title,
    description,
    content,
    imageSrc,
    author,
}: PostPreviewProps) {
    const previewPost: Post = {
        id: "preview",
        title,
        description,
        content,
        imageSrc: imageSrc || undefined,
        author,
        publishedTimestamp: Date.now(),
    };

    return (
        <div className="space-y-6">
            <div className="border-b border-border pb-4">
                <PostTitle title={title} />
                <PostSubtitle description={description} />
                {imageSrc && <PostImage imageSrc={imageSrc} />}
            </div>
            
            <PostContent 
                markdownContent={content} 
                containerClassName="max-w-none"
            />
        </div>
    );
}
