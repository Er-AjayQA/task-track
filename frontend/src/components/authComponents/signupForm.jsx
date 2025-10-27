// *********** Imports *********** //
import { useForm } from "react-hook-form";
import { authServices } from "../../services/authService";
import { useEffect, useState } from "react";
import { ImCheckmark, ImCross } from "react-icons/im";
import { toast } from "react-toastify";

export const SignupForm = ({
  onSubmit,
  loading,
  error,
  signupType,
  setSignupType,
  usernameAvailable,
  setUsernameAvailable,
  isPasswordMatching,
  setIsPasswordMatching,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const usernameInput = watch("username");
  const passwordInput = watch("password");
  const confirmPasswordInput = watch("confirmPassword");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Check is Password Matching
  const checkPasswordMatching = (pwd, cpwd) => {
    if (pwd === cpwd) {
      setIsPasswordMatching(true);
    }
  };

  // Check Password Strength

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

  // Run check username availability on typing in username input field
  useEffect(() => {
    checkUsernameAvailability(usernameInput);
  }, [usernameInput]);

  // Run check password and confirm password matching
  useEffect(() => {
    if (
      passwordInput.trim().length > 0 &&
      confirmPasswordInput.trim().length > 0
    ) {
      checkPasswordMatching(passwordInput, confirmPasswordInput);
    }
  }, [confirmPasswordInput]);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
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
          <div className="flex items-center gap-2">
            <div
              className={`${
                usernameInput ? "basis-[95%]" : "basis-[100%]"
              }  flex flex-col`}
            >
              <input
                {...register("username", {
                  required: "Username is required",
                })}
                type="text"
                className="w-full appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Username..."
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              {usernameInput && usernameInput.trim().length > 0 && (
                <>
                  {usernameAvailable ? (
                    <ImCheckmark fill="green" />
                  ) : (
                    <ImCross fill="red" />
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Row 5 */}
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Set password..."
          />
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
          <input
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
            type="password"
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Confirm password..."
          />
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
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </div>
    </form>
  );
};
