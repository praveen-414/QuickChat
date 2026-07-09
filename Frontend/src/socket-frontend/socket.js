import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const socket = io("https://quickchat-backend-zxkb.onrender.com", {
  withCredentials: true,
});

export default socket;
