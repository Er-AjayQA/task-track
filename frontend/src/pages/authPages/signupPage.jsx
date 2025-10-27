// *********** Imports *********** //
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { authServices } from "../../services/authService";
import { Link } from "react-router-dom";
import { SignupForm } from "../../components/authComponents/signupForm";
import { toast } from "react-toastify";

export const SignUpPage = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [isPasswordMatching, setIsPasswordMatching] = useState(false);
  const [signupType, setSignupType] = useState("email");

  const handleLogin = async (formData) => {
    setLoading(true);
    setError("");

    try {
      let response;

      let payload = {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        signupType,
      };

      if (signupType === "email") {
        payload.email = formData.email;
      }

      if (signupType === "mobile") {
        payload.mobileNumber = formData.mobileNumber;
        payload.mobilePrefix = formData.mobilePrefix;
      }

      if (!isPasswordMatching) {
        setError("Password & Confirm password not matching!");
        return;
      }

      if (!usernameAvailable) {
        toast.error("Username already taken!");
        return;
      } else {
        response = await authServices.userSignUp(payload);
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
          usernameAvailable={usernameAvailable}
          setUsernameAvailable={setUsernameAvailable}
          isPasswordMatching={isPasswordMatching}
          setIsPasswordMatching={setIsPasswordMatching}
        />
        <p>
          Already have an account?
          <Link to="/task-track/login"> Click here</Link>
        </p>
      </div>
    </div>
  );
};
