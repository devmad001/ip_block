import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = authService.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            setLoading(true);
            const user = await authService.signInWithGoogle();
            toast.success("Successfully signed in!");
            return user;
        } catch (error) {
            toast.error("Failed to sign in with Google");
            console.error("Sign in error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            setLoading(true);
            await authService.signOut();
            toast.success("Successfully signed out!");
        } catch (error) {
            toast.error("Failed to sign out");
            console.error("Sign out error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        signInWithGoogle,
        signOut,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
