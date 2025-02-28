import { authService } from "../services/authService";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        status: "idle", // 'idle' | 'loading' | 'authenticated' | 'error'
    });

    const initializeAuth = useCallback(async () => {
        const token = authService.getStoredToken();
        if (!token) {
            setAuthState({ user: null, status: "idle" });
            return;
        }

        setAuthState((prev) => ({ ...prev, status: "loading" }));

        try {
            const user = await authService.fetchUser(token);
            authService.setAuthHeader(token);
            setAuthState({ user, status: "authenticated" });
        } catch (error) {
            authService.clearToken();
            authService.clearAuthHeader();
            setAuthState({ user: null, status: "error" });
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        initializeAuth();
        return () => controller.abort();
    }, [initializeAuth]);

    const login = async (credentials) => {
        authService.storeToken(credentials.token);
        authService.setAuthHeader(credentials.token);
        setAuthState({ user: credentials.user, status: "authenticated" });
    };

    const logout = useCallback(() => {
        authService.clearToken();
        authService.clearAuthHeader();
        setAuthState({ user: null, status: "idle" });
    }, []);

    const contextValue = useMemo(
        () => ({
            user: authState.user,
            isAuthenticated: authState.status === "authenticated",
            authStatus: authState.status,
            login,
            logout,
            initializeAuth,
        }),
        [authState.status, authState.user, login, logout, initializeAuth],
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {authState.status !== "loading" && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
