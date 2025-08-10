import { Request, Response } from 'express';
import { IUserService } from '../services/userService';
import { AuthDto, UpdateProfileData } from '../models/user';

export interface IUserController {
    updateProfile(req: Request, res: Response): Promise<void>;
}

export class UserController implements IUserController {
    constructor(
        private readonly userService: IUserService
    ) { }

    async updateProfile(req: Request, res: Response): Promise<void> {
        try {
            // Try to extract token from cookie header
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

            // Validate request body
            const { id, username, bio, avatarUrl }: UpdateProfileData = req.body;
            if (id === undefined) {
                res.status(400).json({ error: 'Id is required' });
                return;
            }
            // Check if at least one field is provided
            if (!username && bio === undefined && avatarUrl === undefined) {
                res.status(400).json({ error: 'At least one field must be provided' });
                return;
            }
            // Validate username if provided
            if (username !== undefined) {
                if (typeof username !== 'string' || username.trim().length === 0) {
                    res.status(400).json({ error: 'Username must be a non-empty string' });
                    return;
                }
                if (username.length > 50) {
                    res.status(400).json({ error: 'Username must be 50 characters or less' });
                    return;
                }
            }
            // Validate bio if provided
            if (bio !== undefined) {
                if (typeof bio !== 'string') {
                    res.status(400).json({ error: 'Bio must be a string' });
                    return;
                }
                if (bio.length > 500) {
                    res.status(400).json({ error: 'Bio must be 500 characters or less' });
                    return;
                }
            }
            // Validate avatarUrl if provided
            if (avatarUrl !== undefined) {
                if (typeof avatarUrl !== 'string') {
                    res.status(400).json({ error: 'Avatar URL must be a string' });
                    return;
                }
                if (avatarUrl.trim().length !== 0) {
                    try {
                        new URL(avatarUrl);
                    } catch {
                        res.status(400).json({ error: 'Invalid avatar URL format' });
                        return;
                    }
                }
            }
            const updateData: UpdateProfileData = { id: id };
            if (username !== undefined) updateData.username = username;
            if (bio !== undefined) updateData.bio = bio;
            if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
            const result: AuthDto = await this.userService.updateProfile(token, updateData);
            res.json(result.user);
        } catch (err: any) {
            console.error('Update profile error:', err);
            if (err.message === 'Invalid token'
                || err.message === 'User not found'
                || err.message === 'Unsufficient permissions') {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            if (err.message === 'Username already taken') {
                res.status(409).json({ error: 'Username already taken' });
                return;
            }
            if (err.message === 'At least one field must be provided') {
                res.status(400).json({ error: err.message });
                return;
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
