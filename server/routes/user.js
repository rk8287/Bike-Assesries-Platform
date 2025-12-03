const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { updateProfile, getAllUsers } = require("../controllers/userController");
const adminAuth = require("../middleware/adminAuth");

// ADMIN: Fetch all users
router.get("/", adminAuth, getAllUsers);

// USER: Update profile
router.put("/update-profile", protect, updateProfile);

module.exports = router;
