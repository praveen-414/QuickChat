import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";
import { getReceiverId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const receiver = req.params.id;
    const messages = req.body.messages;
    let conversation = await conversationModel.findOne({
      participants: { $all: [sender, receiver] },
    });
    const newMessage = await messageModel.create({
      sender,
      receiver,
      messages,
    });
    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    const receiverSocketId = getReceiverId(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
  }
};

const getMessages = async (req, res) => {
  const sender = req.userId;
  const receiver = req.params.id;

  try {
    const conversation = await conversationModel
      .findOne({
        participants: { $all: [sender, receiver] },
      })
      .populate("messages");

    // If no conversation exists, return an empty array
    if (!conversation) {
      return res.status(200).json([]);
    }

    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export default { sendMessage, getMessages };
