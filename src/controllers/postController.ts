import { Request, Response } from 'express';
import { PostServiceFactory } from '../factories/postFactory';
import { PostService } from '../services/postService';

export interface IPostController {
  getFeed(req: Request, res: Response): Promise<void>;
  getPostById(req: Request, res: Response): Promise<void>;
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
}