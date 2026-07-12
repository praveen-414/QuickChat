import express from "express";
import connecteDB from "./db/db.js";
import authRoutes from "../src/routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import multer from "multer";

connecteDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://quickchat-frontend-0z1n.onrender.com",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

export default app;
