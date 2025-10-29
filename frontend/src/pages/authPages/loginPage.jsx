// *********** Imports *********** //
import { useState, useCallback } from "react";
import { useAuth } from "../../context/authContext";
import { authServices } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginForm } from "../../components/authComponents/loginForm";
import { VerifyLoginOtpForm } from "../../components/authComponents/verifyLoginOtpForm";

export const LoginPage = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState(null);
  const [userMobilePrefix, setUserMobilePrefix] = useState(null);
  const [userMobileNumber, setUserMobileNumber] = useState(null);
  const [loginType, setLoginType] = useState("password");
  const [formType, setFormType] = useState("login");
  const navigate = useNavigate();

  // Clear error messages
  const clearError = useCallback(() => setError(""), []);

  // Reset form state
  const resetFormState = useCallback(() => {
    setUserEmail(null);
    setUserMobilePrefix(null);
    setUserMobileNumber(null);
    setFormType("login");
    clearError();
  }, [clearError]);

  // Handle Login with password form submission
  const handleLoginWithPassword = async (formData) => {
    setLoading(true);
    clearError();

    try {
      const payload = {
        userData: formData.userData,
        password: formData.password,
      };

      const response = await authServices.loginWithPassword(payload);

      if (response?.success) {
        toast.success(response?.message || "Login successful!.");
        login(response?.data?.user, response?.data?.token);
      } else {
        setError(response?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Login with OTP form submission
  const handleLoginWithOtp = async (formData) => {
    setLoading(true);
    clearError();

    try {
      const payload = {
        mobilePrefix: formData?.mobilePrefix || null,
        mobileNumber: formData?.mobileNumber || null,
        email: formData?.email || null,
      };

      const response = await authServices.sendOtp(payload);

      if (response?.success) {
        toast.success(
          response?.message || "OTP sent successful! Please verify your OTP."
        );
        setFormType("verifyOtp");
      } else {
        setError(response?.message || "Can't send OTP. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpVerification = async (formData) => {
    setLoading(true);
    clearError();

    try {
      const payload = {
        mobileNumber: userMobileNumber,
        mobilePrefix: userMobilePrefix,
        email: userEmail,
        otp: formData.otp,
      };

      // Validate OTP payload
      if (!payload.otp) {
        setError("OTP is required");
        return;
      }

      const response = await authServices.verifySignupOtp(payload);

      if (response?.success) {
        toast.success(response?.message || "Account verified successfully!");
        navigate("/task-track/login", { replace: true });
        resetFormState();
      } else {
        setError(
          response?.message || "OTP verification failed. Please try again."
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "OTP verification failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Main form submission handler
  const handleFormSubmit = async (formData) => {
    if (formType === "login" && loginType === "password") {
      await handleLoginWithPassword(formData);
    } else if (formType === "login" && loginType === "otp") {
      await handleLoginWithOtp(formData);
    } else if (formType === "verifyOtp" && loginType === "otp") {
      await handleOtpVerification(formData);
    }
  };

  // Handle back to signup from OTP verification
  const handleBackToSignup = () => {
    resetFormState();
  };

  // Handle Resend Otp
  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      let response = "";
      let payload = {
        mobileNumber: userMobileNumber,
        mobilePrefix: userMobilePrefix,
        email: userEmail,
      };

      response = await authServices.resendOtp(payload);

      if (response?.success) {
        toast.success(response?.message || "OTP resend successfully!");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Can't send OTP. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {formType === "login" ? "Login to your account" : "Verify OTP"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {formType === "login"
              ? "Don't have an account? "
              : "Enter the OTP sent to your "}
            {formType === "login" ? (
              <Link
                to="/task-track/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Signup here
              </Link>
            ) : (
              <span>
                {loginType === "password"
                  ? userEmail
                  : `${userMobilePrefix}${userMobileNumber}`}
              </span>
            )}
          </p>
        </div>

        {formType === "login" && (
          <LoginForm
            onSubmit={handleFormSubmit}
            loading={loading}
            error={error}
            loginType={loginType}
            setLoginType={setLoginType}
          />
        )}

        {formType === "verifyOtp" && (
          <VerifyLoginOtpForm
            onSubmit={handleFormSubmit}
            loading={loading}
            error={error}
            onBack={handleBackToSignup}
            handleResendOtp={handleResendOtp}
            contactInfo={
              loginType === "email"
                ? userEmail
                : `${userMobilePrefix}${userMobileNumber}`
            }
          />
        )}
      </div>
    </div>
  );
};
