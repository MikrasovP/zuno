import { UserEntity } from "../db/user";
import { UserDto } from "../models/user";

export interface IUserMapper {
    toDto(user: UserEntity): UserDto;
}

class UserMapper implements IUserMapper {
    toDto(user: UserEntity): UserDto {
        return {
            id: user.id ?? 0,
            email: user.email,
            username: user.username,
            imageSrc: user.imageSrc ?? '',
            bio: user.bio ?? '',
            createdAt: Number(user.createdAt), // Convert bigint to number for DTO
        };
    }
}

export default UserMapper;