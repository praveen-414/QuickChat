import express from "express";
import messageController from "../controllers/message.controller.js";
import isAuth from "../middlewares/isAuth.middleware.js";

const messageRouter = express.Router();

messageRouter.post("/send/:id", isAuth, messageController.sendMessage);
messageRouter.get("/get/:id", isAuth, messageController.getMessages);

export default messageRouter;
