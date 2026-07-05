import userModel from "../models/user.model.js";

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "user not found...!",
      });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};
const getOtherUsers = async (req, res) => {
  try {
    const otherUsers = await userModel
      .find({
        _id: {
          $ne: req.userId,
        },
      })
      .select("-password");
    res.status(201).json({
      otherUsers,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }
    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        {
          name: name.trim(),
        },
        { new: true },
      )
      .select("-password");
    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export default { getCurrentUser, getOtherUsers, updateProfile };
