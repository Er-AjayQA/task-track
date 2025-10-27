// ***************** Imports ***************** //
const twilio = require("twilio");

// ***************** Twilio Credentials ***************** //
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// ***************** Setup Twilio Client ***************** //
const client = twilio(accountSid, authToken);

// ***************** Send OTP to Phone Number ***************** //
const sendOtpToPhoneNumber = async (phoneNumber) => {
  try {
    if (!phoneNumber) {
      throw new Error("Phone number is required!");
    }

    console.log(phoneNumber);

    const response = await client.verify.v2
      .services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: "sms" });

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send otp");
  }
};

// ***************** Verify OTP ***************** //
const verifyOtp = async (phoneNumber, otp) => {
  try {
    if (!phoneNumber) {
      throw new Error("Phone number is required!");
    }

    const response = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code: otp });

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send otp");
  }
};

// ***************** Exports ***************** //
module.exports = { sendOtpToPhoneNumber, verifyOtp };
