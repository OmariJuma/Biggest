const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const checkToken = async (request, response, next) => {
  try {
    const authHeader = request.headers?.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      response.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized: Missing or invalid authorization header",
      });
    }
    const token = authHeader.split(" ")[1];
    const isVerified = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(isVerified);
    request.isVerified = isVerified;
    next();
  } catch (error) {
    response
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid" });
  }
};
module.exports = {
  checkToken,
};
