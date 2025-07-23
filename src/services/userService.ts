import { User, UserEntity } from "../db/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const register = async (username: string, password: string): Promise<string> => {
    const hash = bcrypt.hashSync(password, 10);
    const userEntity: UserEntity = {
        id: null,
        username,
        passwordHash: hash,
        imageSrc: null,
        bio: null,
        createdAt: Date.now(),
    };
    await User.addUser(userEntity);
    return jwt.sign({ username }, SECRET, { expiresIn: '7d' });
};

export const login = async (username: string, password: string) => {
    const user = await User.findByUsername(username);
    if (!user || !bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid username or password');
    return jwt.sign({ username }, SECRET, { expiresIn: '7d' });
};
