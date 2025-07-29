import { Post } from "@/data/model/Post";
import { PostPreview } from "@/data/model/PostPreview";


export async function fetchPosts(): Promise<PostPreview[]> {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${API_BASE_URL}/feed`);
    if (!res.ok) {
        throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
    }
    const data: { posts: PostPreview[] } = await res.json();

    return data.posts;
}

export async function fetchPostById(id: string): Promise<Post> {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${API_BASE_URL}/post/${id}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);

    return data as Post;
}
