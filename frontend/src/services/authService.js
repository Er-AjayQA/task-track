// *********** Imports *********** //
import API from "./api";

export const authServices = {
  // *********** Check Username Availability Service *********** //
  checkUserName: (username) => {
    API.post("/check-username-availability", { username });
  },

  // *********** User Signup Service *********** //
  userSignUp: (userData) => {
    API.post("/user-signup", userData);
  },

  // *********** Send OTP Service *********** //
  sendOtp: (userData) => {
    API.post("/send-otp", userData);
  },

  // *********** Resend OTP Service *********** //
  resendOtp: (userData) => {
    API.post("/resend-otp", userData);
  },

  // *********** Verify Signup OTP Service *********** //
  verifySignupOtp: (otpData) => {
    API.put("/signup-otp-verification", otpData);
  },

  // *********** Verify OTP Service *********** //
  verifyOtp: (otpData) => {
    API.put("/otp-verification", otpData);
  },

  // *********** Verify Login OTP Service *********** //
  verifyLoginOtp: (otpData) => {
    API.put("/login-otp-verification", otpData);
  },

  // *********** Login With Password Service *********** //
  loginWithPassword: (loginData) => {
    API.put("/login-with-password", loginData);
  },

  // *********** Logout Service *********** //
  logout: () => {
    localStorage.removeItem("auth_token");
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },
};
