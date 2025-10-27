// *********** Imports *********** //
import API from "./api";

export const authServices = {
  // *********** Check Username Availability Service *********** //
  checkUserName: async (data) => {
    return (
      await API.post(
        "/check-username-availability",
        { username: data },
        { withCredentials: false }
      )
    ).data;
  },

  // *********** User Signup Service *********** //
  userSignUp: async (userData) => {
    return (
      await API.post("/user-signup", userData, { withCredentials: false })
    ).data;
  },

  // *********** Send OTP Service *********** //
  sendOtp: async (userData) => {
    return (await API.post("/send-otp", userData)).data;
  },

  // *********** Resend OTP Service *********** //
  resendOtp: async (userData) => {
    return (await API.post("/resend-otp", userData)).data;
  },

  // *********** Verify Signup OTP Service *********** //
  verifySignupOtp: async (otpData) => {
    return (await API.put("/signup-otp-verification", otpData)).data;
  },

  // *********** Verify OTP Service *********** //
  verifyOtp: async (otpData) => {
    return (await API.put("/otp-verification", otpData)).data;
  },

  // *********** Verify Login OTP Service *********** //
  verifyLoginOtp: async (otpData) => {
    return (await API.put("/login-otp-verification", otpData)).data;
  },

  // *********** Login With Password Service *********** //
  loginWithPassword: async (loginData) => {
    return (await API.put("/login-with-password", loginData)).data;
  },

  // *********** Logout Service *********** //
  logout: () => {
    localStorage.removeItem("auth_token");
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },
};
