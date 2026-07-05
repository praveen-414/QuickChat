import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    messages: {
      type: String,
      default: "",
      requried: true,
    },
  },
  { timestamps: true },
);

const messageModel = mongoose.model("messages", messageSchema);

export default messageModel;
