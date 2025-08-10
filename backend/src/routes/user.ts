import { UserControllerFactory } from '../factories/userFactory';
import { Request, Response } from 'express';

const userController = UserControllerFactory.create();

export default (app: any) => {
  app.put('/user/profile', (req: Request, res: Response) => userController.updateProfile(req, res));
}; 