const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Routes for sign-up and sign-in
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
