const User = require("../models/User");

// UPDATE PROFILE (name, email)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Profile update failed", error });
  }
};

// ADMIN: GET USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
