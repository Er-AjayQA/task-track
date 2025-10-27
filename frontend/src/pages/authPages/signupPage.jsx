import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { authServices } from "../../services/authService";
import { Link } from "react-router-dom";
import { SignupForm } from "../../components/authComponents/signupForm";

export const SignUpPage = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signupType, setSignupType] = useState("email"); // 'password' or 'otp'

  const handleLogin = async (formData) => {
    setLoading(true);
    setError("");

    try {
      let response;

      if (signupType === "email") {
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
            Sign Up to your account
          </h2>
        </div>

        <SignupForm
          onSubmit={handleLogin}
          loading={loading}
          error={error}
          signupType={signupType}
          setSignupType={setSignupType}
        />
        <p>
          Already have an account?
          <Link to="/task-track/login"> Click here</Link>
        </p>
      </div>
    </div>
  );
};
