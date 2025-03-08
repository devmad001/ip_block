import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const UnProtectedRoute = ({ children }) => {
    const auth = useAuth();
    console.log(auth.user);
    if (auth?.user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default UnProtectedRoute;
