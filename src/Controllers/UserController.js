
const { User } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @param {Object} body - Contains username, email, password
 * @returns {Object} - { success, message, token }
 */
const registerUserLogic = async (body) => {
  const { username, email, password } = body;

  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    return {
      success: false,
      message: "An account with this email address already exists.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });

  const registeredUser = await newUser.save();

  if (!registeredUser) {
    return {
      success: false,
      message: "Unable to register at this moment. Try again later!",
    };
  }

  const token = jwt.sign(
    {
      email: registeredUser.email,
      id: registeredUser._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    success: true,
    message: "User registered successfully",
    token,
  };
};

/**
 * @param {Object} body - Contains email, password
 * @returns {Object} - { success, message, token }
 */
const LoginUserLogic = async (body) => {
  const { email, password } = body;

  const alreadyExists = await User.findOne({ email });
  if (!alreadyExists) {
    return {
      success: false,
      message: "No user found. Try Sign up.",
    };
  }

  const isMatchedPswd = await bcrypt.compare(password, alreadyExists.password);
  if (!isMatchedPswd) {
    return {
      success: false,
      message: "Wrong credentials.",
    };
  }

  const token = jwt.sign(
    {
      email: alreadyExists.email,
      id: alreadyExists._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    success: true,
    message: "User login successful",
    token,
  };
};

module.exports = { registerUserLogic, LoginUserLogic };
