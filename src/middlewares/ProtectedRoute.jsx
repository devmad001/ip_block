// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ProtectedRoute = ({ children }) => {
    const auth = useAuth();

    if (!auth?.user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
