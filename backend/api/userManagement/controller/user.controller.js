// ***************** Imports ***************** //
const db = require("../../../config/index");
const sendOtpToEmail = require("../../../services/emailServices");
const {
  sendOtpToPhoneNumber,
  verifyOtp,
} = require("../../../services/twilioServices");
const generateOtp = require("../../../utils/otpGenerator");
const response = require("../../../utils/responseHandler");
const generateToken = require("../../../utils/tokenGenerator");

// ***************** Check Username Availability Controller ***************** //
module.exports.checkUsernameAvailability = async (req, res) => {
  const { username } = req.body;
  const user = "";

  try {
    user = await db.um_user_master.findOne({ where: { username } });
    if (user) {
      return response(res, 309, "Username already taken!");
    } else {
      return response(res, 200, "Username available!");
    }
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal server error");
  }
};

// ***************** User SignUp Controller ***************** //
module.exports.userSignup = async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    mobileNumber,
    mobilePrefix,
    email,
    password,
  } = req.body;
  const user = "";

  try {
    const checkUsernameExistence = await db.um_user_master.findOne({
      where: { username },
    });

    if (checkUsernameExistence) {
      return response(res, 309, "Username already taken!");
    }

    if (email) {
      user = await db.um_user_master.findOne({ where: { email } });

      if (user) {
        return response(res, 309, "User already registered!");
      }

      await db.um_user_master.create({
        username,
        firstName,
        lastName,
        email,
        password,
      });

      return response(res, 201, "Signup successfully!");
    }

    if (mobileNumber || mobilePrefix) {
      user = await db.um_user_master.findOne({
        where: { mobileNumber, mobilePrefix },
      });

      if (user) {
        return response(res, 309, "User already registered!");
      }

      await db.um_user_master.create({
        username,
        firstName,
        lastName,
        mobilePrefix,
        mobileNumber,
        password,
      });

      return response(res, 201, "Signup successfully!");
    }
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal server error");
  }
};

// ***************** Send OTP Controller Controller ***************** //
module.exports.sendOtp = async (req, res) => {
  const { mobileNumber, mobilePrefix, email } = req.body;
  const user = "";

  try {
    if (!email || !mobileNumber || !mobileNumber) {
      return response(res, 400, "Require email or mobile number!");
    }

    let otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    if (email) {
      user = await db.um_user_master.findOne({ where: { email } });

      if (!user) {
        return response(res, 404, "User not registered!");
      }

      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save(); // Saving the OTP and expiry at DB
      await sendOtpToEmail(email, otp); // Sending OTP
      return response(res, 201, "OTP sent successfully");
    }

    if (mobileNumber || mobilePrefix) {
      let phoneNumber = `${mobilePrefix}${mobileNumber}`;
      user = await db.um_user_master.findOne({
        where: { mobileNumber, mobilePrefix },
      });

      if (!user) {
        return response(res, 404, "User not registered!");
      }

      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save(); // Saving the OTP and expiry at DB
      await sendOtpToPhoneNumber(phoneNumber); // Sending OTP
      return response(res, 201, "OTP sent successfully");
    }
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal server error");
  }
};

// ***************** Verify OTP Controller ***************** //
module.exports.verifyOtp = async (req, res) => {
  const { mobileNumber, mobilePrefix, email, otp, agreedToTerms, method } =
    req.body;
  const user = "";
  let token = "";

  try {
    if (!email || !mobileNumber || !mobileNumber) {
      return response(res, 400, "Require email or mobile number!");
    }

    // If emailId provided
    if (email) {
      user = await db.um_user_master.findOne({ where: { email } }); // Get user details

      if (!user) {
        return response(res, 404, "User not found!");
      }

      const currentDate = new Date(); // Get current Dates
      // Check If Otp Exist || Otp Not Matched || Otp Expired
      if (
        !user.otp ||
        String(user.otp) !== String(otp) ||
        currentDate > new Date(user.otpExpiry)
      ) {
        return response(res, 400, "Invalid or expired otp");
      }

      user.otp = null;
      user.otpExpiry = null;
      user.isEmailVerified = method === "signup" ? true : user.isEmailVerified;
      user.isLoginVerified = method === "signup" ? false : true;
      user.agreedToTerms = agreedToTerms;
      await user.save();
    }

    // If mobile number provided
    if (mobileNumber || mobilePrefix) {
      let phoneNumber = `${mobilePrefix}${mobileNumber}`;
      user = await db.um_user_master.findOne({
        where: { mobileNumber, mobilePrefix },
      });

      if (!user) {
        return response(res, 404, "User not registered!");
      }
      const result = await verifyOtp(phoneNumber, otp);

      if (result.status !== "approved") {
        return response(res, 400, "Invalid otp");
      }
      user.isMobileVerified =
        method === "signup" ? true : user.isMobileVerified;
      user.isLoginVerified = method === "signup" ? false : true;
      user.agreedToTerms = agreedToTerms;
      await user.save();
    }

    token = generateToken(user.id); // Saving token
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return response(res, 201, "Login successfully", { token, user });
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal server error");
  }
};

// ***************** Login With Password Controller ***************** //
module.exports.loginWithPassword = async (req, res) => {
  const { mobileNumber, mobilePrefix, email, password } = req.body;
  const user = "";
  let token = "";

  try {
    if (email) {
      user = await db.um_user_master.findOne({ where: { email } });
    }

    if (mobileNumber || mobilePrefix) {
      user = await db.um_user_master.findOne({
        where: { mobileNumber, mobilePrefix },
      });
    }

    if (!user) {
      return response(res, 404, "User not found!");
    }

    if (user.password !== password) {
      return response(res, 400, "Invalid credentials!");
    }

    token = generateToken(user.id); // Saving token
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return response(res, 201, "Login successfully", { token, user });
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal server error");
  }
};
