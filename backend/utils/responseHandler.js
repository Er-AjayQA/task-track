// ***************** Imports ***************** //
const response = async (
  res,
  statusCode,
  successStatus,
  message,
  data = null
) => {
  try {
    if (!res) {
      console.error("Response object is null!");
      return;
    }

    const responseObject = {
      status: statusCode,
      success: successStatus,
      message,
      data,
    };

    return res.status(statusCode).json(responseObject);
  } catch (error) {
    console.error("Internal Server Error!", error);
  }
};

// ***************** Exports ***************** //
module.exports = response;
