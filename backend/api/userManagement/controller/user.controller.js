// ***************** Imports ***************** //
const db = require("../../../config/index");
const generateOtp = require("../../../utils/otpGenerator");
const response = require("../../../utils/responseHandler");

// ***************** Check Username Availability Controller ***************** //
module.exports.userSignup = async (req, res) => {
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
  const { username, firstName, lastName, mobileNumber, mobilePrefix, email } =
    req.body;
  const user = "";

  try {
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
      });

      return response(res, 201, "Signup successfully!");
    }
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal server error");
  }
};
