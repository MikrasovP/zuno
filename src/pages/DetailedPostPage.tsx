import PostContent from "@/components/ui/detailed_post/PostContent";
import { Post, mockPosts } from "@/data/model/Post";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostTitle from "@/components/ui/detailed_post/PostTitle";
import PostSubtitle from "@/components/ui/detailed_post/PostSubtitle";
import PostImage from "@/components/ui/detailed_post/PostImage";

const horizontalPaddingClasses = "px-8 lg:px-24 xl:px-32 2xl:px-48";

export default function DetailedPostPage() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const post = mockPosts.find((post: Post) => post.id === id);
        if (post) {
            setPost(post);
        }
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            {post?.title && <PostTitle title={post.title} containerClassName={horizontalPaddingClasses} />}
            {post?.description && <PostSubtitle subtitle={post.description} containerClassName={horizontalPaddingClasses} />}
            {post?.imageSrc && <PostImage image={post.imageSrc} />}
            <PostContent markdownContent={post?.content || ''} containerClassName={"px-12 lg:px-32 xl:px-48 2xl:px-64"} />
        </div>
    )
}