const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express();
const tourRoute = require("./routes/tourRoute");
const userRoute = require("./routes/userRoute");
const globalErrorHandler = require("./controller/errorController");
dotenv.config({ path: "./config.env" });

app.use(express.json());

app.use(morgan("dev"));

// 1 MEDDILEWARE

//2 Routes
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/user", userRoute);

//all route uncatch
app.all("*", (req, res, next) => {
  const err = new Error(`Can not get ${req.originalUrl} on this server`);
  err.statusCode = 404;
  err.status = "fail";

  next(err);
});

app.use(globalErrorHandler);
module.exports = app;
