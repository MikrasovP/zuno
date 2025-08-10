import { UserEntity, IUserRepository } from "../db/user";
import bcrypt from 'bcryptjs';
import { AuthDto, UpdateProfileData, UserDto } from '../models/user';
import IUserMapper from "../mappers/userMapper";
import { getUserFromToken, signToken } from '../utils/jwt';

export interface IUserService {
    register(email: string, username: string, password: string): Promise<AuthDto>;
    login(email: string, password: string): Promise<AuthDto>;
    updateProfile(token: string, data: UpdateProfileData): Promise<AuthDto>;
    validateToken(token: string): Promise<UserDto | null>;
}

export class UserService implements IUserService {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly userMapper: IUserMapper
    ) { }

    async register(email: string, username: string, password: string): Promise<AuthDto> {
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

        const token = signToken(email);
        return { token, user: this.userMapper.toDto(user) };
    }

    async login(email: string, password: string): Promise<AuthDto> {
        const user = await this.userRepository.findByEmail(email);

        if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
            throw new Error('Invalid email or password');
        }
        const token = signToken(email);

        return { token, user: this.userMapper.toDto(user) };
    }

    async updateProfile(token: string, data: UpdateProfileData): Promise<AuthDto> {
        const userDto = await getUserFromToken(token, this.userRepository, this.userMapper);
        
        if (userDto.id !== data.id) {
            throw new Error('Unsufficient permissions');
        }

        const user = await this.userRepository.findByEmail(userDto.email);
        if (!user || !user.id) {
            throw new Error('User not found');
        }

        // Validate input data
        if (Object.keys(data).length === 0) {
            throw new Error('At least one field must be provided');
        }

        // Check if username is being updated and if it's already taken
        if (data.username && data.username !== user.username) {
            const existingUser = await this.userRepository.findByUsername(data.username);
            if (existingUser) {
                throw new Error('Username already taken');
            }
        }

        // Prepare update data
        const updateData: Partial<UserEntity> = {};
        if (data.username) updateData.username = data.username;
        if (data.bio !== undefined) updateData.bio = data.bio;
        if (data.avatarUrl !== undefined) updateData.imageSrc = data.avatarUrl;

        // Update user
        const updatedUser = await this.userRepository.updateUser(user.id, updateData);
        if (!updatedUser) {
            throw new Error('Failed to update user');
        }

        // Generate new token
        const newToken = signToken(updatedUser.email);
        return { token: newToken, user: this.userMapper.toDto(updatedUser) };
    }

    async validateToken(token: string): Promise<UserDto | null> {
        try {
            return await getUserFromToken(token, this.userRepository, this.userMapper);
        } catch {
            return null;
        }
    }
}
