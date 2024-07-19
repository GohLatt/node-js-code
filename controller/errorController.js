const resError = require("../utlis/resError");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.code === 11000)
    return resError(res, 400, `duplicate field of ${err.keyValue.email}`);

  if (err.message === "invalid token")
    return resError(res, 401, "Your token is invalid");
  if (err.message === "jwt expired")
    return resError(res, 401, "Your token is expired,Please login again");

  res
    .status(err.statusCode)
    .json({ status: err.status, message: err.message, error: err });
};
