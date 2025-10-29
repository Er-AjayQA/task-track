/* eslint-disable no-useless-escape */
// *********** Imports *********** //
import { Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";

export const VerifyLoginOtpForm = ({
  onSubmit,
  loading,
  error,
  onBack,
  handleResendOtp,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Enable real-time validation
  });

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Error Display */}
      {error && (
        <div className="rounded-md bg-red-50 p-4 border border-red-200">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <MdCancel fill="red" />
              <h3 className="text-sm font-medium text-red-800">
                SignIn failed
              </h3>
            </div>

            <div className="mt-1 text-sm text-red-700">{error}</div>
          </div>
        </div>
      )}

      {/* OTP Input Section */}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Verification Code
          </label>
          <div className="relative">
            <input
              {...register("otp", {
                required: "Verification code is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Please enter a valid 6-digit code",
                },
                minLength: {
                  value: 6,
                  message: "Code must be 6 digits",
                },
                maxLength: {
                  value: 6,
                  message: "Code must be 6 digits",
                },
              })}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              autoComplete="one-time-code"
              className={`appearance-none rounded-lg relative block w-full px-4 py-3 border placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                errors.otp
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter 6-digit code"
              disabled={loading}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {!errors.otp && watch("otp")?.length === 6 && (
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          {errors.otp ? (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <RiErrorWarningFill fill="red" className="w-5 h-5" />
              {errors.otp.message}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3">
        <button
          type="submit"
          disabled={loading || !isValid}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Spinner
                color="warning"
                aria-label="Verifying..."
                className="w-5 h-5"
              />
              Verifying...
            </div>
          ) : (
            "Verify Account"
          )}
        </button>

        {/* Back to Signup Button */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200 cursor-pointer"
          >
            Back to Login
          </button>
        )}

        {/* Resend Code Option */}
        <div className="text-center">
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={loading}
            onClick={handleResendOtp}
          >
            Didn't receive the code? Resend
          </button>
        </div>
      </div>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          The code will expire in 10 minutes
        </p>
      </div>
    </form>
  );
};
