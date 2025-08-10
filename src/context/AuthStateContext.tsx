import { User } from "@/data/model/User";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { validateUser } from "@/api/AuthApi";

interface AuthStateContextProps {
    user: User | null;
    authState: AuthState;
    onLogin: (user: User) => Promise<void>;
    onLogout: () => Promise<void>;
}

export enum AuthState {
    INITIALIZING,
    AUTHENTICATED,
    UNAUTHENTICATED,
}

const AuthStateContext = createContext<AuthStateContextProps | null>(null);

export function AuthStateProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [authState, setAuthState] = useState(AuthState.INITIALIZING);

    useEffect(() => {
        initializeAuth();
    }, []);

    const initializeAuth = async () => {
        try {
            const userData = await validateUser();
            setUser(userData);
            if (userData) {
                setAuthState(AuthState.AUTHENTICATED);
            } else {
                setAuthState(AuthState.UNAUTHENTICATED);
            }
        } catch (error) {
            console.error('Failed to initialize auth:', error);
            setAuthState(AuthState.UNAUTHENTICATED);
            setUser(null);
        }
    };

    const onLogin = async (user: User) => {
        setUser(user);
        setAuthState(AuthState.AUTHENTICATED);
    }

    const onLogout = async () => {
        setUser(null);
        setAuthState(AuthState.UNAUTHENTICATED);
    }

    return (
        <AuthStateContext.Provider value={{ user, authState, onLogin, onLogout }}>
            {children}
        </AuthStateContext.Provider>
    );
}

export function useAuthState() {
    const context = useContext(AuthStateContext);
    if (!context) {
        throw new Error("useAuthState must be used within an AuthStateProvider");
    }
    return context;
}