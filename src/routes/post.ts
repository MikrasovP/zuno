import { PostControllerFactory } from '../factories/postFactory';
import { Request, Response } from 'express';

export default (app: any) => {
  const postController = PostControllerFactory.create();
  app.get('/feed', (req: Request, res: Response) => postController.getFeed(req, res));
  app.get('/post/:id', (req: Request, res: Response) => postController.getPostById(req, res));
  app.get('/user/:id/posts', (req: Request, res: Response) => postController.getUserPosts(req, res));
}; 