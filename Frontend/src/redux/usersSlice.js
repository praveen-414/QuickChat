import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userData: null,
    otherUsersData: [],
    selectedUser: null,
    onlineUsers: [],
    unreadMessages: {},
  },
  reducers: {
    setUsersData: (state, action) => {
      state.userData = action.payload;
    },
    setOtherUsersData: (state, action) => {
      state.otherUsersData = action.payload;
    },
   setSelectedUser: (state, action) => {
  state.selectedUser = action.payload;

  if (action.payload) {
    delete state.unreadMessages[action.payload._id];
  }
},
    logOut: (state) => {
      state.userData = null;
      state.otherUsersData = null;
      state.selectedUser = null;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
   incrementUnread: (state, action) => {
  const senderId = action.payload;

  state.unreadMessages[senderId] =
    (state.unreadMessages[senderId] || 0) + 1;
},
  },
});

export const {
  setUsersData,
  setOtherUsersData,
  setSelectedUser,
  logOut,
  setOnlineUsers,
  incrementUnread
} = usersSlice.actions;

export default usersSlice.reducer;
