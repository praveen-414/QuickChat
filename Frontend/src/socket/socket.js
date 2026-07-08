import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const socket = io("http://localhost:4000", {
  withCredentials: true,
});

export default socket;
