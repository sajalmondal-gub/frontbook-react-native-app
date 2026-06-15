import { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser, logout as logoutService } from "../services/authService";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            console.log("Failed to initialize auth:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (userData: any) => {
        setUser(userData);
    };

    const logout = async () => {
        await logoutService();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);