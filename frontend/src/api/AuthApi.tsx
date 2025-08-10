import { User } from "@/data/model/User";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface UpdateProfileData {
    id: number;
    username?: string;
    bio?: string;
    avatarUrl?: string;
}

export const login = async (email: string, password: string): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        throw new Error(`Failed to login`);
    }
    const user: User = await res.json();
    return user;
};

export const signup = async (
    username: string,
    email: string,
    password: string,
): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) {
        throw new Error(`Failed to signup`);
    }
    const user: User = await res.json();
    return user;
};

export const updateProfile = async (updateData: UpdateProfileData): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updateData),
    });
    if (!res.ok) {
        throw new Error(`Failed to update profile`);
    }
    const user: User = await res.json();
    return user;
};

export const validateUser = async (): Promise<User | null> => {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/validate`, {
            method: 'GET',
            credentials: 'include',
        });
        
        if (!res.ok) {
            return null; // Token is invalid or expired
        }
        
        const user: User = await res.json();
        return user;
    } catch (error) {
        console.error('Error validating user:', error);
        return null;
    }
};

export const logout = async (): Promise<void> => {
    try {   
        const res = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        if (!res.ok) {
            throw new Error(`Failed to logout`);
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
};