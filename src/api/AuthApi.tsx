import { User } from "@/data/model/User";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface AuthResponse {
    token: string;
    user: User;
}

export const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        throw new Error(`Failed to login`);
    }
    const data = await res.json();
    return data;
};

export const signup = async (username: string, email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) {
        throw new Error(`Failed to signup`);
    }
    const data = await res.json();
    return data;
};