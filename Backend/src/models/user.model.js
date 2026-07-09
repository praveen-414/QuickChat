import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  profile: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  confirmPassword: {
    type: String,
  },
});

const userModel = mongoose.model("chatUsers", userSchema);

export default userModel;
