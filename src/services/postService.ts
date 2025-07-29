import { PostDto } from "../models/post";
import { IPostRepository } from "../db/post";
import { IPostMapper } from "../mappers/postMapper";

export interface IPostService {
    getPost(id: string): Promise<PostDto | null>;
    getPosts(page: number, limit: number): Promise<PostDto[]>;
}

export class PostService implements IPostService {
    constructor(
        private readonly postRepository: IPostRepository,
        private readonly postMapper: IPostMapper
    ) {}

    async getPost(id: string): Promise<PostDto | null> {
        const post = await this.postRepository.getById(id);
        if (!post) return null;
        return this.postMapper.toDto(post);
    }

    async getPosts(page: number, limit: number): Promise<PostDto[]> {
        const posts = await this.postRepository.getPaginatedWithoutContent(page, limit);
        return posts.map(post => this.postMapper.toDto(post));
    }
}
