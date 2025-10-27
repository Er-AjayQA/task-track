// *********** Imports *********** //
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

// *********** Public Route Component *********** //
export const PublicRoutes = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/task-track/dashboard" replace />;
  }

  return children;
};
