// ***************** Imports ***************** //
const db = require("../../../config/index");
const generateOtp = require("../../../utils/otpGenerator");
const response = require("../../../utils/responseHandler");

// ***************** User SignUp Controller ***************** //
module.exports.userSignup = async (req, res) => {
  const { mobileNumber, mobilePrefix, email } = req.body;
  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
  const user = "";

  try {
    if (email) {
    }
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal server error");
  }
};
