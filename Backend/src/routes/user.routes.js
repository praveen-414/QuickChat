import express from "express";
import authController from "../controllers/auth.controller.js";
import userController from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.middleware.js";
import multer from "multer";
const userRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

userRouter.get("/current", isAuth, userController.getCurrentUser);
userRouter.get("/others", isAuth, userController.getOtherUsers);
userRouter.put(
  "/profile",
  isAuth,
  upload.single("profile"),
  userController.updateProfile
);

export default userRouter;
