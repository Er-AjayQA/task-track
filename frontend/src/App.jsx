import "./App.css";
import { AuthProvider } from "./context/authContext";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/authPages/loginPage";
import { PublicRoutes } from "./routes/publicRoutes";
import { DashboardPage } from "./pages/dashboardPage";
import { ProtectedRoutes } from "./routes/protectedRoutes";
import { PageNotFoundPage } from "./pages/pageNotFoundPage";
import { SignUpPage } from "./pages/authPages/signupPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/task-track/login"
          element={
            <PublicRoutes>
              <LoginPage />
            </PublicRoutes>
          }
        />

        <Route
          path="/task-track/signup"
          element={
            <PublicRoutes>
              <SignUpPage />
            </PublicRoutes>
          }
        />

        <Route
          path="/task-track/*"
          element={
            <PublicRoutes>
              <PageNotFoundPage />
            </PublicRoutes>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/task-track/"
          element={
            <ProtectedRoutes>
              <DashboardPage />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/task-track/dashboard"
          element={
            <ProtectedRoutes>
              <DashboardPage />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/task-track/*"
          element={
            <ProtectedRoutes>
              <PageNotFoundPage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

// *********** Exports *********** //
export default App;
