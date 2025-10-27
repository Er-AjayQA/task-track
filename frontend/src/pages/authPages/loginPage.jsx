import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { LoginForm } from "../../components/authComponents/loginForm";
import { authServices } from "../../services/authService";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState("password"); // 'password' or 'otp'

  const handleLogin = async (formData) => {
    setLoading(true);
    setError("");

    try {
      let response;

      if (loginMethod === "password") {
        response = await authServices.loginWithPassword(formData);
      } else {
        response = await authServices.loginWithOtp(formData);
      }

      if (response.data.success) {
        login(response.data.data.user, response.data.data.token);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <LoginForm
          onSubmit={handleLogin}
          loading={loading}
          error={error}
          loginMethod={loginMethod}
          setLoginMethod={setLoginMethod}
        />
        <p>
          Don't have an account?
          <Link to="/task-track/signup"> Click here</Link>
        </p>
      </div>
    </div>
  );
};
