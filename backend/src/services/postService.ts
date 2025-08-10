import { PostDto, CreatePostData } from "../models/post";
import { IPostRepository } from "../db/post";
import { IPostMapper } from "../mappers/postMapper";
import { IUserRepository } from "../db/user";
import IUserMapper from "../mappers/userMapper";
import { getUserFromToken } from '../utils/jwt';

export interface IPostService {
    getPost(id: string): Promise<PostDto | null>;
    getPosts(page: number, limit: number): Promise<PostDto[]>;
    getPostsByAuthor(authorId: number, page: number, limit: number): Promise<PostDto[]>;
    createPost(token: string, postData: CreatePostData): Promise<string>;
}

export class PostService implements IPostService {
    constructor(
        private readonly postRepository: IPostRepository,
        private readonly postMapper: IPostMapper,
        private readonly userRepository: IUserRepository,
        private readonly userMapper: IUserMapper
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

    async getPostsByAuthor(authorId: number, page: number, limit: number): Promise<PostDto[]> {
        const posts = await this.postRepository.getByAuthorId(authorId, page, limit);
        return posts.map(post => this.postMapper.toDto(post));
    }

    async createPost(token: string, postData: CreatePostData): Promise<string> {
        const userDto = await getUserFromToken(token, this.userRepository, this.userMapper);

        return await this.postRepository.createPost({
            ...postData,
            authorId: userDto.id,
        });
    }
}
