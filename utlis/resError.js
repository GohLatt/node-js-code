const resError = (res, status, message) => {
  res.status(status).json({
    status: `${status}`.startsWith(4) ? "fail" : "error",
    message: message,
  });
};

module.exports = resError;
