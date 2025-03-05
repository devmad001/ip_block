import { createContext, useContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import api from "../api/axios";

const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Setting up auth state listener");
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(
                "Auth state changed:",
                user ? "User logged in" : "User logged out",
            );
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signInWithGoogle = async () => {
        console.log("Starting Google sign-in process");
        const provider = new GoogleAuthProvider();
        try {
            console.log("Opening Google sign-in popup");
            const result = await signInWithPopup(auth, provider);
            console.log("Google sign-in successful, getting ID token");
            const idToken = await result.user.getIdToken();

            console.log("Sending token to backend");
            // Send the token to the backend
            const { data } = await api.post(
                "/api/v1/auth/google",
                { idToken },
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                },
            );

            console.log("Backend response received:", data);
            // Store the JWT token from our backend
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            toast.success("Successfully signed in!");
            return data.user;
        } catch (error) {
            console.error("Error in signInWithGoogle:", error);
            toast.error(error.message || "Failed to sign in with Google");
            throw error;
        }
    };

    const logout = async () => {
        console.log("Starting logout process");
        try {
            await signOut(auth);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.success("Successfully signed out!");
        } catch (error) {
            console.error("Error in logout:", error);
            toast.error(error.message || "Failed to sign out");
            throw error;
        }
    };

    const value = {
        user,
        signInWithGoogle,
        logout,
        loading,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
