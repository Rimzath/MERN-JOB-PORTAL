const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Check if the user is authenticated
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies; // Get token from cookies

  // Ensure the token exists
  if (!token) {
    return next(new ErrorResponse("You must log in!", 401));
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set the user in the request object (req.user)
    req.user = await User.findById(decoded.id);

    // If the user is not found, return an error
    if (!req.user) {
      return next(new ErrorResponse("User not found!", 404));
    }

    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("JWT verification error:", error); // Log the error for debugging
    return next(new ErrorResponse("You must log in!", 401));
  }
};
