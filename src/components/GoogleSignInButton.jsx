import { useAuth } from "../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
export function GoogleSignInButton() {
    const { signInWithGoogle, loading } = useAuth();
    const navigate = useNavigate();
    const handleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/dashboard");
            console.log("Google Sign-In successful");
        } catch (error) {
            console.error("Error signing in with Google:", error);
            console.error("Error details:", {
                code: error.code,
                message: error.message,
                stack: error.stack,
            });
        }
    };

    return (
        <Button
            variant="outline"
            onClick={handleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2">
            <FcGoogle className="w-5 h-5" />
            {loading ? "Signing in..." : "Sign in with Google"}
        </Button>
    );
}
