// *********** Imports *********** //
import { useAuth } from "../context/authContext";
import { Navigate, useLocation } from "react-router-dom";

// *********** Protected Route Component *********** //
export const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/task-track/login" state={{ from: location }} replace />
    );
  }

  return children;
};
