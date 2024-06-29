const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors/customError')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err) {
    console.log("error middleware --->",err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err })
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Something went wrong try again later')
}

module.exports = errorHandlerMiddleware