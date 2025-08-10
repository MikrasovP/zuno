import { Request, Response } from 'express';
import { IUserService } from '../services/userService';
import { AuthDto } from '../models/user';

export interface IAuthController {
  register(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
  validate(req: Request, res: Response): Promise<void>;
  logout(req: Request, res: Response): Promise<void>;
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
      const authDto: AuthDto = await this.userService.register(email, username, password);
      res.cookie(
        'token',
        authDto.token,
        { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 }
      );
      res.json(authDto.user);
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
      const authDto: AuthDto = await this.userService.login(email, password);
      res.cookie(
        'token',
        authDto.token,
        { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 }
      );
      res.json(authDto.user);
    } catch (err: any) {
      res.status(401).json({ error: err.message || 'Invalid credentials' });
    }
  };

  async validate(req: Request, res: Response): Promise<void> {
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
      const user = await this.userService.validateToken(token);
      if (!user) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    console.log('logout');
    console.log(req.headers);
    console.log(req.body);
    try {
      res.clearCookie('token', { httpOnly: true, secure: false });
      res.status(200).send();
    } catch (err) {
      res.status(500).json({ error: 'Failed to logout' });
    }
  }
}