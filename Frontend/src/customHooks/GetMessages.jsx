import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsersData } from "../redux/usersSlice";
import axios from "axios";
import { setMessages } from "../redux/messagesSlice";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const { userData, selectedUser } = useSelector((state) => state.user);
  
  
  useEffect(() => {
      if (!userData || !selectedUser) return; 
    const fetchMessages = async () => {
 
      
      if (!selectedUser?._id) return;
      try {
        const res = await axios.get(
          `https://quickchat-backend-zxkb.onrender.com/api/message/get/${selectedUser._id}`, 
          {
            withCredentials: true,
          },
        );
        dispatch(setMessages(res.data));
      } catch (error) {
       console.log(error.response?.status);
  console.log(error.response?.data);
      }
    };
    fetchMessages();
  }, [selectedUser, userData]);
};

export default useGetMessages;
