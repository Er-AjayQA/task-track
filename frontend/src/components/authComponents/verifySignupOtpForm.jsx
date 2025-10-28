/* eslint-disable no-useless-escape */
// *********** Imports *********** //
import { useForm } from "react-hook-form";

export const VerifySignupOtpForm = ({ onSubmit, loading, error }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* form Body */}
      <div className="flex flex-col gap-5">
        {/* Row 2 */}
        <div className="grow flex justify-between gap-2">
          {/* FirstName */}
          <div className="basis-[100%]">
            <label htmlFor="otp" className="sr-only">
              otp
            </label>
            <input
              {...register("otp", {
                required: "This field is required",
              })}
              type="text"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter otp..."
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.otp.message}
              </p>
            )}
          </div>
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
