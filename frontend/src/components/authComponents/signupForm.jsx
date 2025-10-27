import { useForm } from "react-hook-form";

export const SignupForm = ({
  onSubmit,
  loading,
  error,
  signupType,
  setSignupType,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-5">
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
              placeholder="Enter firstname..."
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
              placeholder="Enter lastname..."
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

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
              placeholder="Enter mobileNo...."
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            EmailId
          </label>
          <input
            {...register("email", { required: "email is required" })}
            type="email"
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter emailId..."
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 text-left">
              {errors.email.message}
            </p>
          )}
        </div>

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

      {signupType === "mobile" && (
        <div>
          <label htmlFor="otp" className="sr-only">
            OTP
          </label>
          <input
            {...register("otp", {
              required: "OTP is required",
              pattern: {
                value: /^\d{6}$/,
                message: "OTP must be 6 digits",
              },
            })}
            type="text"
            maxLength="6"
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter OTP"
          />
          {errors.otp && (
            <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
          )}
        </div>
      )}

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
