import PostContent from "../detailed_post/PostContent";
import PostTitle from "../detailed_post/PostTitle";
import PostSubtitle from "../detailed_post/PostSubtitle";
import PostImage from "../detailed_post/PostImage";

interface PostPreviewProps {
    title: string;
    description: string;
    content: string;
    imageSrc: string;
}

export default function PostPreview({
    title,
    description,
    content,
    imageSrc,
}: PostPreviewProps) {

    return (
        <div className="space-y-6">
            <div className="border-b border-border pb-4">
                <PostTitle title={title} />
                <PostSubtitle subtitle={description} />
                {imageSrc && <PostImage image={imageSrc} />}
            </div>
            
            <PostContent 
                markdownContent={content} 
                containerClassName="max-w-none"
            />
        </div>
    );
}
