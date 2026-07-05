import express from "express";
import authController from "../controllers/auth.controller.js";
import userController from "../controllers/user.controller.js"
import isAuth from "../middlewares/isAuth.middleware.js"
const userRouter = express.Router();

userRouter.get("/current",isAuth, userController.getCurrentUser);
userRouter.get("/others",isAuth, userController.getOtherUsers);
userRouter.post("/profile",isAuth, userController.updateProfile);



export default userRouter;
