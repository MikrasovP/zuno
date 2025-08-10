export interface User {
    id: number;
    username: string;
    email: string;
    imageSrc?: string;
    bio?: string;
    createdAt: number;
}