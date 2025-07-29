import { AuthControllerFactory } from '../factories/userFactory';
import { Request, Response } from 'express';
const authController = AuthControllerFactory.create();

export default (app: any) => {
  app.post('/auth/register', (req: Request, res: Response) => authController.register(req, res));
  app.post('/auth/login', (req: Request, res: Response) => authController.login(req, res));
};
