import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

export function LogoutButton() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            // Error is already handled in the auth context
            console.error("Logout failed:", error);
        }
    };

    return (
        <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="w-4 h-4" />
            Logout
        </Button>
    );
}
