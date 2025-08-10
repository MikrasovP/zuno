export interface UserDto {
  id: number;
  email: string;
  username: string;
  imageSrc: string;
  bio: string;
  createdAt: number;
}

export interface AuthDto {
  token: string;
  user: UserDto;
}

export interface UpdateProfileData {
  id: number;
  username?: string;
  bio?: string;
  avatarUrl?: string;
}