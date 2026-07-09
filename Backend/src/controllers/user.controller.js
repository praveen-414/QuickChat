import userModel from "../models/user.model.js";
import imagekit from "../config/imagekit.js";

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
    console.log("Route hit");

    console.log("User ID:", req.userId);
    console.log("Body:", req.body);
    console.log("File:", !!req.file);

    let profile = "";

    if (req.file) {
      console.log("Uploading...");

      try {
        const uploadedImage = await imagekit.files.upload({
          file: req.file.buffer.toString("base64"),
          fileName: Date.now() + "-" + req.file.originalname,
        });

        console.log(uploadedImage);

        profile = uploadedImage.url;
      } catch (error) {
        console.log(error);
      }
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.userId,
      {
        name: req.body.name,
        profile,
      },
      { new: true },
    );

    console.log("Updated User:", updatedUser);

    return res.status(200).json({
      message: "Updated",
      user: updatedUser,
    });
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};
export default { getCurrentUser, getOtherUsers, updateProfile };
