import { PostPreview } from "@/data/model/PostPreview";
import { PostCard } from "../card/PostCard";

export default function CardsList({ mockPosts }: { mockPosts: PostPreview[] }) {
    return (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    )
}