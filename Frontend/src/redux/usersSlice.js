import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userData: null,
    otherUsersData: [],
    selectedUser: null,
    onlineUsers: [],
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
    },
    logOut: (state) => {
      state.userData = null;
      state.otherUsersData = null;
      state.selectedUser = null;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setUsersData, setOtherUsersData, setSelectedUser, logOut, setOnlineUsers } =
  usersSlice.actions;

export default usersSlice.reducer;
