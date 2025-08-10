import { prisma } from '.'

export interface PostEntity {
    id: string;
    title: string | null;
    description: string | null;
    publishedTimestamp: bigint;
    imageSrc: string | null;
    content: string | null;
    authorId: number;
}

export interface PostWithAuthorModel {
    id: string;
    title: string | null;
    description: string | null;
    publishedTimestamp: bigint;
    imageSrc: string | null;
    content: string | null;
    author: {
        username: string;
        imageSrc: string;
    };
}

export interface CreatePostEntity {
    title: string;
    description: string;
    content: string;
    imageSrc?: string;
    authorId: number;
}

export interface IPostRepository {
    getPaginatedWithoutContent(page: number, limit: number): Promise<PostWithAuthorModel[]>;
    getById(id: string): Promise<PostWithAuthorModel | null>;
    getByAuthorId(authorId: number, page: number, limit: number): Promise<PostWithAuthorModel[]>;
    createPost(post: CreatePostEntity): Promise<string>;
}

export class Post implements IPostRepository {

    async getPaginatedWithoutContent(page = 1, limit = 10): Promise<PostWithAuthorModel[]> {
        const res = await prisma.posts.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                publishedTimestamp: 'desc'
            },
            select: {
                id: true,
                title: true,
                description: true,
                publishedTimestamp: true,
                imageSrc: true,
                users: {
                    select: {
                        username: true,
                        imageSrc: true,
                    },
                },
            },
        })
        return res.map((post: any) => ({
            ...post,
            content: '',
            author: {
                username: post.users.username,
                imageSrc: post.users.imageSrc ?? '',
            },
        }));
    }

    async getById(id: string): Promise<PostWithAuthorModel | null> {
        const res = await prisma.posts.findUnique({
            where: { id: id },
            select: {
                id: true,
                title: true,
                description: true,
                publishedTimestamp: true,
                imageSrc: true,
                content: true,
                users: {
                    select: {
                        username: true,
                        imageSrc: true,
                    },
                },
            },
        }).catch(err => {
            console.log(err);
            return null;
        });
        if (!res) return null;
        return {
            ...res,
            author: {
                username: res.users.username,
                imageSrc: res.users.imageSrc ?? '',
            },
        }
    }

    async getByAuthorId(authorId: number, page = 1, limit = 10): Promise<PostWithAuthorModel[]> {
        const res = await prisma.posts.findMany({
            where: { authorId: authorId },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                publishedTimestamp: 'desc'
            },
            select: {
                id: true,
                title: true,
                description: true,
                publishedTimestamp: true,
                imageSrc: true,
                users: {
                    select: {
                        username: true,
                        imageSrc: true,
                    },
                },
            },
        })
        return res.map((post: any) => ({
            ...post,
            content: '',
            author: {
                username: post.users.username,
                imageSrc: post.users.imageSrc ?? '',
            },
        }));
    }

    async createPost(post: CreatePostEntity): Promise<string> {
        const result = await prisma.posts.create({
            data: {
                id: this.generateId(),
                title: post.title,
                description: post.description,
                content: post.content,
                imageSrc: post.imageSrc || null,
                publishedTimestamp: BigInt(Date.now()),
                authorId: post.authorId,
            },
        });
        return result.id;
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}