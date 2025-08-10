import { PostWithAuthorModel } from "../db/post";
import { PostDto } from "../models/post";

export interface IPostMapper {
    toDto(post: any): PostDto;
}

class PostMapper implements IPostMapper {
    toDto(post: PostWithAuthorModel): PostDto {
        return {
            id: post.id,
            title: post.title ?? '',
            description: post.description ?? '',
            author: {
                username: post.author.username,
                imageSrc: post.author.imageSrc ?? ''
            },
            publishedTimestamp: Number(post.publishedTimestamp),
            imageSrc: post.imageSrc ?? '',
            content: post.content ?? ''
        };
    }
}

export default PostMapper;