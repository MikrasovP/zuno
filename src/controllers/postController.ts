import { Request, Response } from 'express';
import { getPost, getPosts } from '../services/postService';

export const getFeed = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  try {
    const posts = await getPosts(page, limit);
    res.json({ posts, page, limit });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const post = await getPost(id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) {
    res.status(404).json({ error: 'Not found' });
  }
}; 