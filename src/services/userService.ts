import { UserEntity, IUserRepository } from "../db/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthResponse } from '../models/user';
import IUserMapper from "../mappers/userMapper";

export interface IUserService {
    register(email: string, username: string, password: string): Promise<AuthResponse>;
    login(email: string, password: string): Promise<AuthResponse>;
}

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export class UserService implements IUserService {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly userMapper: IUserMapper,
        private readonly jwtSecret: string = SECRET
    ) { }

    async register(email: string, username: string, password: string): Promise<AuthResponse> {
        const hash = bcrypt.hashSync(password, 10);
        const userEntity: UserEntity = {
            id: null,
            email,
            username,
            passwordHash: hash,
            imageSrc: null,
            bio: null,
            createdAt: BigInt(Date.now()), // Convert to BigInt to match Prisma schema
        };

        await this.userRepository.addUser(userEntity);
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error('User not found after creation');
        }

        const token = this.signToken(email);
        return { token, user: this.userMapper.toDto(user) };
    }

    async login(email: string, password: string): Promise<AuthResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
            throw new Error('Invalid email or password');
        }
        const token = this.signToken(email);

        return { token, user: this.userMapper.toDto(user) };
    }

    private signToken(email: string): string {
        return jwt.sign({ email }, this.jwtSecret, { expiresIn: '7d' });
    }
}
