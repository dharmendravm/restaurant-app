import User from "../models/user.js";

//get all users Admin
export const getTotalUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    console.log(`Error found ${error}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get profile by token
export const getUserByToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update user 
export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "User updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Deactivate user (soft delete)
export const deactivateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    res.json({
      success: true,
      message: "User deactivated",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "User deleted permanently",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};