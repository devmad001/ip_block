import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "../../contexts/authContext";
import { FcGoogle } from "react-icons/fc";

export const LoginButton = () => {
    const { signInWithGoogle, loading } = useAuth();

    const handleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            // Error is already handled in the auth context
            console.error("Login failed:", error);
        }
    };

    return (
        <Button
            onClick={handleLogin}
            disabled={loading}
            variant="outline"
            className="flex items-center gap-2 w-full">
            <FcGoogle className="w-5 h-5" />
            {loading ? "Signing in..." : "Sign in with Google"}
        </Button>
    );
};
