import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userData: null,
    otherUsersData: null,
    selectedUser:null
  },
  reducers: {
    setUsersData: (state, action) => {
      state.userData = action.payload;
    },
    setOtherUSersData: (state, action) => {
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
  },
  
});

export const { setUsersData, setOtherUSersData, setSelectedUser, logOut } = usersSlice.actions;

export default usersSlice.reducer;
