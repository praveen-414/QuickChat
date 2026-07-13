import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";
import { getReceiverId } from "../socket-backend/socket.js";
import { io } from "../socket-backend/socket.js";

const sendMessage = async (req, res) => {
  console.time("sendMessage");
  try {
    const sender = req.userId;
    const receiver = req.params.id;
    const messages = req.body.messages;
    console.time("findConversation");
    let conversation = await conversationModel.findOne({
      participants: { $all: [sender, receiver] },
    });
    console.timeEnd("findConversation");
    console.time("createMessage");
    const newMessage = await messageModel.create({
      sender,
      receiver,
      messages,
    });
    console.timeEnd("createMessage");
    console.time("saveConversation");
    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }
    console.timeEnd("saveConversation");
    const receiverSocketId = getReceiverId(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
    console.timeEnd("sendMessage");
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
