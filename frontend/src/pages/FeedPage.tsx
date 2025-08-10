import CardsList from "@/components/ui/list/CardsList";
import { fetchPosts } from "@/api/PostApi";
import { useEffect, useState } from "react";
import { useLoadState } from "@/context/LoadStateContext";
import { PostPreview } from "@/data/model/PostPreview";

export default function FeedPage() {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const { setLoading } = useLoadState();

  useEffect(() => {
    console.log('fetching posts');
    setLoading(true);
    fetchPosts()
      .then((data) =>{
        console.log(data);
        setPosts(data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      })
      .finally(() => setLoading(false));
  }, []);


  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-foreground">Latest Posts</h1>
      <CardsList posts={posts} />
    </div>
  );
} 