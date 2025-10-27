// ***************** Imports ***************** //
const db = require("../../../config/index");
const bcrypt = require("bcrypt");
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
  let user = "";
  const transaction = await db.sequelize.transaction();

  try {
    user = await db.um_user_master.findOne({
      where: { username },
      transaction,
    });
    if (user) {
      await transaction.rollback();
      return response(res, 309, "Username already taken!");
    } else {
      await transaction.commit();

      let resData = response(res, 200, "Username available!");
      console.log("RESPONSE DATA>>>", resData);
      return resData;
    }
  } catch (error) {
    console.error(error);
    await transaction.rollback();
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
    signupType,
  } = req.body;
  let user = "";
  const transaction = await db.sequelize.transaction();

  try {
    const checkUsernameExistence = await db.um_user_master.findOne({
      where: { username },
      transaction,
    });

    if (checkUsernameExistence) {
      await transaction.rollback();
      return response(res, 309, "Username already taken!");
    }

    let otp = await generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    if (signupType === "email") {
      if (!email) {
        await transaction.rollback();
        return response(res, 400, "EmailId is required!");
      }

      if (email) {
        user = await db.um_user_master.findOne({
          where: { email },
          transaction,
        });

        if (user) {
          await transaction.rollback();
          return response(res, 309, "EmailId already registered!");
        }

        const hashedPassword = await bcrypt.hash(password, 12); // Hashing password
        await db.um_user_master.create(
          {
            username,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            otp,
            otpExpiry,
            status: false,
          },
          { transaction }
        );

        await sendOtpToEmail(email, otp); // Sending OTP
        await transaction.commit();
        return response(res, 201, "Otp sent successfully!");
      }
    }

    if (signupType === "mobile") {
      if (!mobileNumber || !mobilePrefix) {
        await transaction.rollback();
        return response(res, 400, "Mobile number is required!");
      }

      if (mobileNumber || mobilePrefix) {
        const phoneNumber = `${mobilePrefix}${mobileNumber}`;
        user = await db.um_user_master.findOne({
          where: { mobileNumber, mobilePrefix },
          transaction,
        });

        if (user) {
          await transaction.rollback();
          return response(res, 309, "Mobile number already registered!");
        }

        const hashedPassword = await bcrypt.hash(password, 12); // Hashing password
        await db.um_user_master.create(
          {
            username,
            firstName,
            lastName,
            mobilePrefix,
            mobileNumber,
            password: hashedPassword,
            otp,
            otpExpiry,
            status: false,
          },
          { transaction }
        );

        await sendOtpToPhoneNumber(phoneNumber); // Sending OTP
        await transaction.commit();
        return response(res, 201, "Otp sent successfully!");
      }
    }
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return response(res, 500, "Internal server error");
  }
};

// ***************** Send OTP Controller Controller ***************** //
module.exports.sendOtp = async (req, res) => {
  const { mobileNumber, mobilePrefix, email } = req.body;
  let user = "";
  let { userId } = req.user;

  const transaction = await db.sequelize.transaction();

  try {
    let otp = await generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    user = await db.um_user_master.findOne({
      where: { id: userId },
      transaction,
    });

    if (!user) {
      await transaction.rollback();
      return response(res, 404, "User not found!");
    }

    if (email) {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save({ transaction }); // Saving the OTP and expiry at DB
      await sendOtpToEmail(email, otp); // Sending OTP
      await transaction.commit();
      return response(res, 201, "OTP sent successfully");
    }

    if (mobileNumber || mobilePrefix) {
      let phoneNumber = `${mobilePrefix}${mobileNumber}`;
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save({ transaction }); // Saving the OTP and expiry at DB
      await sendOtpToPhoneNumber(phoneNumber); // Sending OTP
      await transaction.commit();
      return response(res, 201, "OTP sent successfully");
    }
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return response(res, 500, "Internal server error");
  }
};

// ***************** ReSend OTP Controller Controller ***************** //
module.exports.resendOtp = async (req, res) => {
  const { mobileNumber, mobilePrefix, email } = req.body;
  let user = "";
  const transaction = await db.sequelize.transaction();

  try {
    let otp = await generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    if (email) {
      user = await db.um_user_master.findOne({ where: { email }, transaction });

      if (!user) {
        await transaction.rollback();
        return response(res, 404, "User not found!");
      }

      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save({ transaction }); // Saving the OTP and expiry at DB
      await sendOtpToEmail(email, otp); // Sending OTP
      await transaction.commit();
      return response(res, 201, "OTP sent successfully");
    }

    if (mobileNumber || mobilePrefix) {
      let phoneNumber = `${mobilePrefix}${mobileNumber}`;
      user = await db.um_user_master.findOne({
        where: { mobileNumber, mobilePrefix },
        transaction,
      });

      if (!user) {
        await transaction.rollback();
        return response(res, 404, "User not found!");
      }

      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save({ transaction }); // Saving the OTP and expiry at DB
      await sendOtpToPhoneNumber(phoneNumber); // Sending OTP
      await transaction.commit();
      return response(res, 201, "OTP sent successfully");
    }
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return response(res, 500, "Internal server error");
  }
};

// ***************** Verify OTP For Login Controller ***************** //
module.exports.loginOtpVerification = async (req, res) => {
  const { mobileNumber, mobilePrefix, email, otp, agreedToTerms } = req.body;
  let user = "";
  let token = "";
  const transaction = await db.sequelize.transaction();

  try {
    // If emailId provided
    if (email) {
      user = await db.um_user_master.findOne({ where: { email }, transaction }); // Get user details

      if (!user) {
        await transaction.rollback();
        return response(res, 404, "User not found!");
      }

      const currentDate = new Date(); // Get current Dates
      // Check If Otp Exist || Otp Not Matched || Otp Expired
      if (
        !user.otp ||
        String(user.otp) !== String(otp) ||
        currentDate > new Date(user.otpExpiry)
      ) {
        await transaction.rollback();
        return response(res, 400, "Invalid or expired otp!");
      }

      user.otp = null;
      user.otpExpiry = null;
      user.isLoginVerified = true;
      user.agreedToTerms = agreedToTerms;
      await user.save({ transaction });
    }

    // If mobile number provided
    if (mobileNumber || mobilePrefix) {
      let phoneNumber = `${mobilePrefix}${mobileNumber}`;
      user = await db.um_user_master.findOne({
        where: { mobileNumber, mobilePrefix },
        transaction,
      });

      if (!user) {
        await transaction.rollback();
        return response(res, 404, "User not registered!");
      }
      const result = await verifyOtp(phoneNumber, otp);

      if (result.status !== "approved") {
        await transaction.rollback();
        return response(res, 400, "Invalid otp");
      }

      user.otp = null;
      user.otpExpiry = null;
      user.isLoginVerified = true;
      user.agreedToTerms = agreedToTerms;
      await user.save({ transaction });
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

// ***************** Verify OTP For SignUp Controller ***************** //
module.exports.signupOtpVerification = async (req, res) => {
  const { mobileNumber, mobilePrefix, email, otp } = req.body;
  let user = "";
  const transaction = await db.sequelize.transaction();

  try {
    // If emailId provided
    if (email) {
      user = await db.um_user_master.findOne({ where: { email }, transaction }); // Get user details

      if (!user) {
        await transaction.rollback();
        return response(res, 404, "User not found!");
      }

      const currentDate = new Date(); // Get current Dates
      // Check If Otp Exist || Otp Not Matched || Otp Expired
      if (
        !user.otp ||
        String(user.otp) !== String(otp) ||
        currentDate > new Date(user.otpExpiry)
      ) {
        await transaction.rollback();
        return response(res, 400, "Invalid or expired otp!");
      }

      await db.um_user_master.update(
        {
          otp: null,
          otpExpiry: null,
          isEmailVerified: true,
          status: true,
        },
        { where: { id: user.id }, transaction }
      );

      await transaction.commit();
      return response(res, 201, "Signup successfully!");
    }

    // If mobile number provided
    if (mobileNumber || mobilePrefix) {
      let phoneNumber = `${mobilePrefix}${mobileNumber}`;
      user = await db.um_user_master.findOne({
        where: { mobileNumber, mobilePrefix },
        transaction,
      });

      if (!user) {
        await transaction.rollback();
        return response(res, 404, "User not registered!");
      }
      const result = await verifyOtp(phoneNumber, otp);

      if (result.status !== "approved") {
        await transaction.rollback();
        return response(res, 400, "Invalid otp");
      }

      await db.um_user_master.update(
        {
          otp: null,
          otpExpiry: null,
          isMobileVerified: true,
          status: true,
        },
        { where: { id: user.id }, transaction }
      );

      await transaction.commit();
      return response(res, 201, "Signup successfully!");
    }
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return response(res, 500, "Internal server error");
  }
};

// ***************** Verify OTP Controller ***************** //
module.exports.otpVerification = async (req, res) => {
  const { mobileNumber, mobilePrefix, email, otp } = req.body;
  let user = "";
  const { userId } = req.user;
  const transaction = await db.sequelize.transaction();

  try {
    // Get user details
    user = await db.um_user_master.findOne({
      where: { id: userId },
      transaction,
    });

    if (!user) {
      await transaction.rollback();
      return response(res, 404, "User not found!");
    }

    // If emailId provided
    if (email) {
      const currentDate = new Date(); // Get current Dates

      // Check If Otp Exist || Otp Not Matched || Otp Expired
      if (
        !user.otp ||
        String(user.otp) !== String(otp) ||
        currentDate > new Date(user.otpExpiry)
      ) {
        await transaction.rollback();
        return response(res, 400, "Invalid or expired otp!");
      }

      await db.um_user_master.update(
        {
          otp: null,
          otpExpiry: null,
          email,
          isEmailVerified: true,
        },
        { where: { id: userId }, transaction }
      );

      await transaction.commit();
      return response(res, 201, "Email verified successfully!");
    }

    // If mobile number provided
    if (mobileNumber || mobilePrefix) {
      let phoneNumber = `${mobilePrefix}${mobileNumber}`;
      const result = await verifyOtp(phoneNumber, otp);

      if (result.status !== "approved") {
        await transaction.rollback();
        return response(res, 400, "Invalid otp");
      }

      await db.um_user_master.update(
        {
          otp: null,
          otpExpiry: null,
          mobilePrefix,
          mobileNumber,
          isMobileVerified: true,
        },
        { where: { id: userId }, transaction }
      );

      await transaction.commit();
      return response(res, 201, "Mobile number verified successfully!");
    }
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return response(res, 500, "Internal server error");
  }
};

// ***************** Login With Password Controller ***************** //
module.exports.loginWithPassword = async (req, res) => {
  const { username, mobileNumber, mobilePrefix, email, password } = req.body;
  let user = "";
  let token = "";
  const transaction = await db.sequelize.transaction();

  try {
    if (email) {
      user = await db.um_user_master.findOne({
        where: { email, isDeleted: true, status: true },
        transaction,
      });
    }

    if (mobileNumber || mobilePrefix) {
      user = await db.um_user_master.findOne({
        where: { mobileNumber, mobilePrefix, isDeleted: true, status: true },
        transaction,
      });
    }

    if (username) {
      user = await db.um_user_master.findOne({
        where: { username, isDeleted: true, status: true },
        transaction,
      });
    }

    if (!user) {
      await transaction.rollback();
      return response(res, 404, "User not found!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Comparing password

    if (!isPasswordValid) {
      await transaction.rollback();
      return response(res, 400, "Invalid credentials!");
    }

    token = await generateToken(user.id); // Saving token
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    await transaction.commit();
    return response(res, 201, "Login successfully", { token, user });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return response(res, 500, "Internal server error");
  }
};
