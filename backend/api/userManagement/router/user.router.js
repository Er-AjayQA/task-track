// ***************** Imports ***************** //
const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authMiddleware = require("../../../middleware/authMiddleware");

// ***************** Routes ***************** //
router.post(
  "/check-username-availability",
  userController.checkUsernameAvailability
);
router.post("/send-otp", authMiddleware, userController.sendOtp);
router.post("/resend-otp", userController.resendOtp);
router.put("/otp-verification", authMiddleware, userController.otpVerification);
router.post("/user-signup", userController.userSignup);
router.post("/login-otp-verification", userController.loginOtpVerification);
router.put("/signup-otp-verification", userController.signupOtpVerification);
router.post("/login-with-password", userController.loginWithPassword);

// ***************** Exports ***************** //
module.exports = router;
