import { getFeed, getPostById } from '../controllers/postController';

export default (app: any) => {
  app.get('/feed', getFeed);
  app.get('/post/:id', getPostById);
}; 