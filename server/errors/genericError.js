const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./customError");
class GenericError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
module.exports = GenericError;
