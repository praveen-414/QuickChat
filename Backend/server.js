import dotenv from "dotenv";
import { server } from "./src/socket/socket.js";
dotenv.config();

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server started successfully on port ${port}`);
});
