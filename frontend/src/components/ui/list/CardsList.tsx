import { PostPreview } from "@/data/model/PostPreview";
import { PostCard } from "../card/PostCard";

export default function CardsList({ posts = [] }: { posts: PostPreview[] }) {
  if ( posts.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No posts found
      </div>
    )
  }

    return (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {posts.map((post: PostPreview) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    )
}