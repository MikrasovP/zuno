import { User } from "@/data/model/User";
import { createContext, useContext, useState, ReactNode } from "react";


interface AuthStateContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthStateContext = createContext<AuthStateContextProps | null>(null);

export function AuthStateProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthStateContext.Provider value={{ user, setUser }}>
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