/* eslint-disable no-useless-escape */
// *********** Imports *********** //
import { useForm } from "react-hook-form";
import { authServices } from "../../services/authService";
import { useEffect, useState } from "react";
import { ImCheckmark, ImCross } from "react-icons/im";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { PasswordProgressBar } from "./passwordProgressBar";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { PasswordRuleTooltip } from "./passwordRuleTooltip";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";

export const SignupForm = ({
  onSubmit,
  loading,
  error,
  signupType,
  setSignupType,
  usernameAvailable,
  setUsernameAvailable,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const usernameInput = watch("username");
  const passwordInput = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrengthValue, setPasswordStrengthValue] = useState(null);
  const [progressColor, setProgressColor] = useState("red");
  const [progressCount, setProgressCount] = useState(0);
  const [showPasswordRules, setShowPasswordRules] = useState(false);

  // Check Username Availability Function
  const checkUsernameAvailability = async (username) => {
    if (!username || username.trim().length === 0) {
      setUsernameAvailable(null);
      return;
    }

    try {
      const response = await authServices.checkUserName(username);
      response.status === 200
        ? setUsernameAvailable(true)
        : setUsernameAvailable(false);
    } catch (error) {
      setUsernameAvailable(false);
      console.log(error);
    }
  };

  // Check password Strength
  const checkPasswordStrength = (pwd) => {
    if (!pwd || pwd.trim().length <= 0) {
      setPasswordStrengthValue(null);
      setProgressColor("gray");
      setProgressCount(0);
      return;
    }

    const password = pwd.trim();

    // Character type checks
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );

    // Count character types
    const charTypeCount = [
      hasLowerCase,
      hasUpperCase,
      hasNumbers,
      hasSpecialChars,
    ].filter(Boolean).length;

    let score = 0;
    let strengthValue = "";
    let color = "red";
    let progress = 0;

    // Very Weak: Only one character type OR length <= 4 with poor complexity
    if (password.length <= 4 || charTypeCount === 1) {
      score = 1;
      strengthValue = "Very Weak";
      color = "red";
      progress = 20;
    }
    // Weak: Only two character types OR length <= 8 with basic complexity
    else if (password.length <= 8 || charTypeCount === 2) {
      score = 2;
      strengthValue = "Weak";
      color = "yellow";
      progress = 40;
    }
    // Medium: Three character types OR length <= 12 with good complexity
    else if (password.length <= 12 || charTypeCount === 3) {
      score = 3;
      strengthValue = "Medium";
      color = "teal";
      progress = 60;
    }
    // Strong: Four character types AND length > 12
    else if (password.length <= 14 && charTypeCount === 4) {
      score = 4;
      strengthValue = "Strong";
      color = "lime";
      progress = 80;
    }
    // Very Strong: Four character types AND length > 14
    else if (password.length > 14 && charTypeCount === 4) {
      score = 5;
      strengthValue = "Very Strong";
      color = "green";
      progress = 100;
    }
    // Fallback for edge cases
    else {
      // If it doesn't fit above categories but is long with good complexity
      if (password.length > 16 && charTypeCount >= 3) {
        score = 5;
        strengthValue = "Very Strong";
        color = "green";
        progress = 100;
      } else if (password.length > 12 && charTypeCount >= 3) {
        score = 4;
        strengthValue = "Strong";
        color = "lime";
        progress = 80;
      } else {
        score = 3;
        strengthValue = "Medium";
        color = "yellow";
        progress = 60;
      }
    }

    setPasswordStrengthValue(strengthValue);
    setProgressColor(color);
    setProgressCount(progress);
  };

  // Run check username availability on typing in username input field
  useEffect(() => {
    checkUsernameAvailability(usernameInput);
  }, [usernameInput]);

  // Run check password strength
  useEffect(() => {
    checkPasswordStrength(passwordInput);
  }, [passwordInput]);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Error Display */}
      {error && (
        <div className="rounded-md bg-red-50 p-4 border border-red-200">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <MdCancel fill="red" />
              <h3 className="text-sm font-medium text-red-800">
                Signup failed
              </h3>
            </div>

            <div className="mt-1 text-sm text-red-700">{error}</div>
          </div>
        </div>
      )}

      {/* form Body */}
      <div className="flex flex-col gap-5">
        {/* Row 1 */}
        <div className="flex gap-10">
          <label>Signup With:</label>
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <input
                {...register("signupType")}
                id="email"
                type="radio"
                value="email"
                checked={signupType === "email"}
                onChange={(e) => setSignupType(e.target.value)}
              />
              <label htmlFor="email">Email Id</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                {...register("signupType")}
                id="mobile"
                type="radio"
                value="mobile"
                checked={signupType === "mobile"}
                onChange={(e) => setSignupType(e.target.value)}
              />
              <label htmlFor="mobile">Mobile No.</label>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grow flex justify-between gap-2">
          {/* FirstName */}
          <div className="basis-[100%]">
            <label htmlFor="firstName" className="sr-only">
              FirstName
            </label>
            <input
              {...register("firstName", {
                required: "This field is required",
              })}
              type="text"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Firstname..."
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* LastName */}
          <div className="basis-[100%]">
            <label htmlFor="lastName" className="sr-only">
              LastName
            </label>
            <input
              {...register("lastName", {
                required: "This field is required",
              })}
              type="text"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Lastname..."
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 3 */}
        {signupType === "email" ? (
          <div>
            <label htmlFor="email" className="sr-only">
              EmailId
            </label>
            <input
              {...register("email", { required: "email is required" })}
              type="email"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email Id..."
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.email.message}
              </p>
            )}
          </div>
        ) : (
          <div className="grow flex justify-between gap-2">
            {/* Mobile Prefix */}
            <div className="basis-[20%]">
              <label htmlFor="mobilePrefix" className="sr-only">
                Mobile Prefix
              </label>
              <input
                {...register("mobilePrefix", {
                  required: "This field is required",
                })}
                type="text"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="+91"
              />
              {errors.mobilePrefix && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.mobilePrefix.message}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="basis-[100%]">
              <label htmlFor="mobileNumber" className="sr-only">
                Mobile Number
              </label>
              <input
                {...register("mobileNumber", {
                  required: "This field is required",
                })}
                type="text"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Mobile no..."
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Row 4 */}
        <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <div className="relative">
            <input
              {...register("username", {
                required: "Username is required",
              })}
              type="text"
              className="w-full appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
              placeholder="Username..."
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {usernameInput && usernameInput.trim().length > 0 && (
                <>
                  {usernameAvailable ? (
                    <ImCheckmark fill="green" className="w-4 h-4" />
                  ) : (
                    <ImCross fill="red" className="w-4 h-4" />
                  )}
                </>
              )}
            </div>
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm mt-1 text-left">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Row 5 - Password Field with Enhanced UI */}
        <div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type={showPassword ? "text" : "password"}
              className="w-full appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-20"
              placeholder="Set password..."
            />

            {/* Password Help Tooltip Icon */}
            <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
              <div className="relative">
                <FaRegCircleQuestion
                  className="w-4 h-4 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
                  onMouseEnter={() => setShowPasswordRules(true)}
                  onMouseLeave={() => setShowPasswordRules(false)}
                />
              </div>
            </div>
            {/* Password Rules Tooltip */}
            {showPasswordRules && <PasswordRuleTooltip />}

            {/* Password Visibility Toggle */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {showPassword ? (
                <IoIosEye
                  className="cursor-pointer w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <IoIosEyeOff
                  className="cursor-pointer w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>

          {/* Password Strength Progress Bar */}
          {progressCount > 0 && (
            <PasswordProgressBar
              passwordStrengthValue={passwordStrengthValue}
              progressColor={progressColor}
              progressCount={progressCount}
            />
          )}

          {errors.password && (
            <p className="text-red-500 text-sm mt-1 text-left">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Row 6 */}
        <div>
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
              type={showConfirmPassword ? "text" : "password"}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm password..."
            />
            {showConfirmPassword ? (
              <IoIosEye
                className="cursor-pointer w-5 h-5 absolute right-2 top-3"
                fill="gray"
                onClick={() => setShowConfirmPassword(false)}
              />
            ) : (
              <IoIosEyeOff
                className="cursor-pointer w-5 h-5 absolute right-2 top-3"
                fill="gray"
                onClick={() => setShowConfirmPassword(true)}
              />
            )}
          </div>

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1 text-left">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </div>
    </form>
  );
};
