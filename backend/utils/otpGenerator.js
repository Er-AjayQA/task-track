// ***************** Imports ***************** //

// ***************** Generate 6-Digit OTP Function ***************** //
const generateOtp = async () => {
  return Math.floor(100000 + Math.random() * 90000).toString();
};

// ***************** Exports ***************** //
module.exports = generateOtp;
