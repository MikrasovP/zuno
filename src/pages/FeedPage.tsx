import CardsList from "@/components/ui/list/CardsList";
import { mockPosts } from "@/data/model/Post";

export default function FeedPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-foreground">Latest Posts</h1>
      <CardsList mockPosts={mockPosts} />
    </div>
  );
} 