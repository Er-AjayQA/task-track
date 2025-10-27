import { useForm } from "react-hook-form";

export const LoginForm = ({
  onSubmit,
  loading,
  error,
  loginMethod,
  setLoginMethod,
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

      <div className="flex space-x-4 mb-4">
        <button
          type="button"
          className={`flex-1 py-2 px-4 rounded ${
            loginMethod === "password"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setLoginMethod("password")}
        >
          Password
        </button>
        <button
          type="button"
          className={`flex-1 py-2 px-4 rounded ${
            loginMethod === "otp"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setLoginMethod("otp")}
        >
          OTP
        </button>
      </div>

      <div>
        <label htmlFor="identifier" className="sr-only">
          Email, Mobile or Username
        </label>
        <input
          {...register("identifier", { required: "This field is required" })}
          type="text"
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Email, Mobile or Username"
        />
        {errors.identifier && (
          <p className="text-red-500 text-sm mt-1">
            {errors.identifier.message}
          </p>
        )}
      </div>

      {loginMethod === "password" && (
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      )}

      {loginMethod === "otp" && (
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
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </form>
  );
};
