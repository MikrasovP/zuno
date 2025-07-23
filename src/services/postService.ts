import { Post } from "../db/post";
import { postToDto } from "../mappers/postMapper";
import { PostDto } from "../models/post";

export const getPost = async (id: string): Promise<PostDto | null> => {
  const post = await Post.getById(id);
  if (!post) return null;
  return postToDto(post);
};

export const getPosts = async (page: number, limit: number): Promise<PostDto[]> => {
  const posts = await Post.getPaginatedWithoutContent(page, limit);
  return posts.map(post => postToDto(post));
};