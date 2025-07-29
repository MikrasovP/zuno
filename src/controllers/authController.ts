import { Request, Response } from 'express';
import { IUserService } from '../services/userService';
import { AuthResponse } from '../models/user';

export interface IAuthController {
  register(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
}

export class AuthController implements IAuthController {

  constructor(
    private readonly userService: IUserService
  ) { }

  async register(req: Request, res: Response) {
    console.log(req.body);
    console.log(req.headers);
    const username = req.body?.username as string;
    const email = req.body?.email as string;
    const password = req.body?.password as string;
    if (!email || !username || !password)
      res.status(400).json({ error: 'Missing fields' });

    try {
      const authDto: AuthResponse = await this.userService.register(email, username, password);
      res.cookie(
        'token',
        authDto.token,
        { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 }
      );
      res.json(authDto);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: 'User exists' });
    }
  };

  async login(req: Request, res: Response) {
    console.log(req.body);
    console.log(req.headers);
    const email = req.body?.email as string;
    const password = req.body?.password as string;
    try {
      const authDto: AuthResponse = await this.userService.login(email, password);
      res.cookie(
        'token',
        authDto.token,
        { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 }
      );
      res.json(authDto);
    } catch (err: any) {
      res.status(401).json({ error: err.message || 'Invalid credentials' });
    }
  };
}