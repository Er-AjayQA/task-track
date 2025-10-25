// *********** Imports *********** //
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

// *********** Public Route Component *********** //
const PublicRoutes = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// *********** Exports *********** //
export default PublicRoutes;
