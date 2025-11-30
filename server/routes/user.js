const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const { getAllUsers } = require("../controllers/userController");

router.get("/", adminAuth, getAllUsers);

module.exports = router;
