import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    return user ? children : <Navigate to="/login" replace state={{ from: location }} />;
};

export default ProtectedRoute;