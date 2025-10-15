// ***************** Imports ***************** //
const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

// ***************** Routes ***************** //
router.post(
  "/check-username-availability",
  userController.checkUsernameAvailability
);
router.post("/send-otp", userController.sendOtp);
router.post("/user-signup", userController.userSignup);
router.post("/login-otp-verification", userController.loginOtpVerification);
router.post("/signup-otp-verification", userController.signupOtpVerification);
router.post("/login-with-password", userController.loginWithPassword);

// ***************** Exports ***************** //
module.exports = router;
