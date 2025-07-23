import { Request, Response } from 'express';
import { register as proceedRegister, login as proceedLogin }
  from '../services/userService';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const token = await proceedRegister(username, password);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: 'User exists' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const token = await proceedLogin(username, password);
    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ error: err.message || 'Invalid credentials' });
  }
}; 