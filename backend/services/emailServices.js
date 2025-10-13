// ***************** Imports ***************** //
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const otpHtmlFormat = require("../mailsFormats/otpFormat");
dotenv.config();

// ***************** Transporter Configs ***************** //
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ***************** Check Email Connections ***************** //
transporter.verify((error, success) => {
  if (error) {
    console.error("Gmail services connection failed!");
  } else {
    console.log("Gmail configured properly and ready to send mails!");
  }
});

// ***************** Send OTP to Email Address ***************** //
const sendOtpToEmail = async (email, otp) => {
  const html = otpHtmlFormat(otp);

  await transporter.sendMail({
    from: `TaskTracker <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your TaskTracker verification code.",
    html,
  });
};

// ***************** Exports ***************** //
module.exports = sendOtpToEmail;
