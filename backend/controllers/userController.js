const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

// Load All Users
exports.allUsers = async (req, res, next) => {
  const pageSize = Number(req.query.pageSize) || 10; // Allow dynamic page size
  const page = Number(req.query.pageNumber) || 1;

  try {
    const count = await User.estimatedDocumentCount();
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select("-password")
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      users,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    next(new ErrorResponse("Unable to fetch users", 500));
  }
};

// Show Single User
exports.singleUser = async (req, res, next) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new ErrorResponse("Invalid user ID format", 400));
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new ErrorResponse("Unable to fetch user", 500));
  }
};
