import { Request, Response } from 'express';
import { PostService } from '../services/postService';
import { CreatePostData } from '../models/post';

export interface IPostController {
  getFeed(req: Request, res: Response): Promise<void>;
  getPostById(req: Request, res: Response): Promise<void>;
  getUserPosts(req: Request, res: Response): Promise<void>;
  createPost(req: Request, res: Response): Promise<void>;
}

export class PostController implements IPostController {

  constructor(
    private readonly postService: PostService
  ) { }

  async getFeed(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    try {
      const posts = await this.postService.getPosts(page, limit);
      res.json({ posts, page, limit });
    } catch (err) {
      res.status(500).json({ error: 'DB error' });
    }
  };

  async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const post = await this.postService.getPost(id);
      if (!post) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json(post);
    } catch (err) {
      res.status(404).json({ error: 'Not found' });
    }
  };

  async getUserPosts(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }
      
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const posts = await this.postService.getPostsByAuthor(userId, page, limit);
      res.json({ posts, page, limit });
    } catch (err) {
      res.status(500).json({ error: 'DB error' });
    }
  };

  async createPost(req: Request, res: Response): Promise<void> {
    try {
      let token: string | undefined;
      const cookieHeader = req.headers.cookie;
      if (cookieHeader) {
        const cookies = cookieHeader.split(';').map(c => c.trim());
        for (const cookie of cookies) {
          if (cookie.startsWith('token=')) {
            token = cookie.substring('token='.length);
            break;
          }
        }
      }
      if (!token) {
        res.status(401).json({ error: 'Authorization token missing' });
        return;
      }

      const { title, description, content, imageSrc }: CreatePostData = req.body;

      if (!title || !description || !content) {
        res.status(400).json({ error: 'Title, description, and content are required' });
        return;
      }

      if (typeof title !== 'string' || title.trim().length === 0) {
        res.status(400).json({ error: 'Title must be a non-empty string' });
        return;
      }

      if (typeof description !== 'string' || description.trim().length === 0) {
        res.status(400).json({ error: 'Description must be a non-empty string' });
        return;
      }

      if (typeof content !== 'string' || content.trim().length === 0) {
        res.status(400).json({ error: 'Content must be a non-empty string' });
        return;
      }

      if (imageSrc !== undefined && (typeof imageSrc !== 'string' || imageSrc.trim().length === 0)) {
        res.status(400).json({ error: 'Image URL must be a non-empty string if provided' });
        return;
      }

      const postId = await this.postService.createPost(token, {
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
        imageSrc: imageSrc?.trim(),
      });

      res.status(201).json({ id: postId });
    } catch (err: any) {
      if (err.message === 'Invalid token' || err.message === 'User not found') {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}