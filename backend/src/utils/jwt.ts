import jwt from 'jsonwebtoken';
import { IUserRepository } from '../db/user';
import { UserDto } from '../models/user';
import IUserMapper from '../mappers/userMapper';

export interface JwtPayload {
    email: string;
    iat?: number;
    exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export function verifyToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
        return null;
    }
}

export async function getUserFromToken(
    token: string, 
    userRepository: IUserRepository, 
    userMapper: IUserMapper
): Promise<UserDto> {
    const decoded = verifyToken(token);
    if (!decoded || !decoded.email) {
        throw new Error('Invalid token');
    }

    const user = await userRepository.findByEmail(decoded.email);
    if (!user) {
        throw new Error('User not found');
    }

    return userMapper.toDto(user);
}

export function signToken(email: string): string {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
}
