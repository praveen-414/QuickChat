import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started successfully on port ${port}`);
});
