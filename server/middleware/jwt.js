const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { time } = require("console");
const checkToken = async (request, response, next) => {
  try {
    const authHeader = request.headers?.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      response.status(StatusCodes.UNAUTHORIZED).json({
        error: "Authentication invalid",
      });
    }
    const token = authHeader.split(" ")[1];
    const isVerified = await jwt.verify(token, process.env.JWT_SECRET);
    if (isVerified.exp > Date.now()) {
    return  response.status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Access token has expired" });
    }
    console.log(isVerified);
    request.isVerified = isVerified;
    next();
  } catch (error) {
    response
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Authentication invalid" });
  }
};
module.exports = {
  checkToken,
};
