import { PostDto } from "../models/post";
import { PostWithAuthorModel } from "../db/post";

export const postToDto = (post: PostWithAuthorModel): PostDto => {
  return {
    id: post.id,
    title: post.title ?? '',
    description: post.description ?? '',
    author: {
      username: post.author.username,
      imageSrc: post.author.imageSrc,
    },
    publishedTimestamp: Number(post.publishedTimestamp),
    imageSrc: post.imageSrc ?? '',
    content: post.content ?? '',
  };
};