const { User } = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUserLogic = async (req, res) => {
  const { username, email, password } = req.body;
  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    return res.status(400).json({
      success: false,
      message: "An account with this email address already exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });

  const registedUser = await newUser.save();

  if (!registedUser) {
    return res.status(500).json({
      success: false,
      message: "Unable to register at this moment .Try Again later!",
    });
  }

  const token = jwt.sign(
    {
      email: registedUser.email,
      id: registedUser._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    success: true,
    message: "User registered successfully",
    token,
  });
};

const LoginUserLogic = async (req, res) => {
  const { email, password } = req.body;
  const alreadyExists = await User.findOne({ email });
  if (!alreadyExists) {
    return res.status(400).json({
      success: false,
      message: "No user found. Try Sign up",
    });
  }

  const isMatchedPswd = await bcrypt.compare(password, alreadyExists.password);

  if (!isMatchedPswd) {
    return res.status(401).json({
      success: false,
      message: "Wrong credentials .",
    });
  }

  const token = jwt.sign(
    {
      email: alreadyExists.email,
      id: alreadyExists._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    success: true,
    message: "User Login successfully",
    token,
  });
};
module.exports = { registerUserLogic, LoginUserLogic };
