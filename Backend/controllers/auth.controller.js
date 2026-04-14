const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response.utils");

exports.registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return errorResponse(res, 400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return errorResponse(res, 400, "User already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    role: "user",
  });

  return successResponse(res, 201, "User registered successfully", {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role),
  });
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, 400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return errorResponse(res, 401, "Invalid email or password");
  }

  return successResponse(res, 200, "Login successful", {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role),
  });
});

exports.getProfile = asyncHandler(async (req, res) => {
  return successResponse(res, 200, "Profile fetched successfully", req.user);
});