const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell me your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "User must have Email"],
    lowercase: true,
    trim: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please provide your confrimPassword"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password don't match",
    },
  },
});

userSchema.pre("save", async function (next) {
  //for update other field PATCH
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async (
  conditionalPassword,
  userPassword
) => {
  return await bcrypt.compare(conditionalPassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
