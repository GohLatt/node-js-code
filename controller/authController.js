const resError = require("../utlis/resError");
const User = require("./../modal/userModal");
const catchAsync = require("./../utlis/catchAsync");
const jwt = require("jsonwebtoken");

const singToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRECT, {
    expiresIn: "10d",
  });
};

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = singToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return resError(res, 400, "Provide Email and Password");

  const user = await User.findOne({ email }).select("+password");
  const correct = await user.correctPassword(password, user.password);

  if (!user || !correct)
    return resError(res, 400, "Incorrect Password or Email");

  const token = singToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return resError(res, 401, "You need token to pass tours api, Please login");

  jwt.verify(token, process.env.JWT_SECRECT);

  next();
});
