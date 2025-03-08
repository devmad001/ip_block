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
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        try {
            const { data } = await api.post("/api/v1/users/login", {
                email,
                password,
            });

            if (data.token && data.user) {
                // Store the JWT token and user data
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                return data.user;
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response) {
                throw new Error(error.response.data.error || "Login failed");
            }
            throw error;
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            console.log("Opening Google sign-in popup");
            const result = await signInWithPopup(auth, provider);
            console.log("Google sign-in successful, getting ID token");
            const idToken = await result.user.getIdToken();

            console.log("Sending token to backend");
            const { data } = await api.post(
                "/api/v1/users/google",
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
            setUser(data.user);
            // Set the user state

            toast.success("Successfully signed in!");
            return data.user;
        } catch (error) {
            console.error("Google sign-in error:", error);
            if (error.code === "popup-closed-by-user") {
                toast.error("Sign-in was cancelled");
            } else if (error.code === "popup-blocked") {
                toast.error(
                    "Pop-up was blocked by your browser. Please allow pop-ups for this site.",
                );
            } else {
                toast.error("Failed to sign in with Google");
            }
            throw error;
        }
    };

    const logout = async () => {
        console.log("Starting logout process");
        try {
            await signOut(auth);
            // Clear all auth-related data
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // Reset user state
            setUser(null);
            toast.success("Successfully logged out!");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to log out");
            throw error;
        }
    };

    const value = {
        user,
        loading,
        login,
        signInWithGoogle,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
