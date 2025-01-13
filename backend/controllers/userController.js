const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

// Load all users
exports.allUsers = async (req, res, next) => {
  const pageSize = 10; // Number of users per page
  const page = Number(req.query.pageNumber) || 1;

  try {
    const count = await User.estimatedDocumentCount(); // Total user count
    const users = await User.find()
      .sort({ createdAt: -1 }) // Sort by creation date (most recent first)
      .select("-password") // Exclude the password field
      .skip(pageSize * (page - 1)) // Pagination logic
      .limit(pageSize);

    res.status(200).json({
      success: true,
      users,
      page,
      pages: Math.ceil(count / pageSize), // Total pages
      count,
    });
  } catch (error) {
    next(new ErrorResponse("Unable to fetch users", 500));
  }
};

// Show single user
exports.singleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse("User not found", 404)); // Handle user not found
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new ErrorResponse("Unable to fetch user", 500)); // Catch database or other errors
  }
};
