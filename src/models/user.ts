export interface UserDto {
  id: number;
  email: string;
  username: string;
  imageSrc: string;
  bio: string;
  createdAt: number;
}

export interface AuthResponse {
  token: string;
  user: UserDto;
}