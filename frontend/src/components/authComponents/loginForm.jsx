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

export const LoginForm = ({
  onSubmit,
  loading,
  error,
  loginType,
  setLoginType,
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

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Error Display */}
      {error && (
        <div className="rounded-md bg-red-50 p-4 border border-red-200">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <MdCancel fill="red" />
              <h3 className="text-sm font-medium text-red-800">Login failed</h3>
            </div>

            <div className="mt-1 text-sm text-red-700">{error}</div>
          </div>
        </div>
      )}

      {/* form Body */}
      <div className="flex flex-col gap-5">
        {/* Row 1 */}
        <div className="flex gap-10">
          <label>Login With:</label>
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <input
                {...register("signupType")}
                id="password"
                type="radio"
                value="password"
                checked={loginType === "password"}
                onChange={(e) => setLoginType(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                {...register("signupType")}
                id="otp"
                type="radio"
                value="otp"
                checked={loginType === "otp"}
                onChange={(e) => setLoginType(e.target.value)}
              />
              <label htmlFor="otp">OTP</label>
            </div>
          </div>
        </div>

        {loginType === "otp" ? (
          <div className="flex flex-col gap-3">
            {/* Row 4 */}
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

            <div>
              <p className="text-center">OR</p>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email Id
              </label>
              <div className="relative">
                <input
                  {...register("email", {
                    required: "Email Id is required",
                  })}
                  type="text"
                  className="w-full appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                  placeholder="Enter email id..."
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
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
                  placeholder="Username, Email, Mobile no..."
                />
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
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-20"
                  placeholder="Password..."
                />

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
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        )}
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
