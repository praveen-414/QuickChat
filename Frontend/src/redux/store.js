import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/usersSlice";
import messageSlice from "./messagesSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    message: messageSlice,
    theme: themeSlice,
  },
});

export default store;
