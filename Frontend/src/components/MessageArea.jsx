import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import axios from "axios";
import { setMessages } from "../redux/messagesSlice";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { setSelectedUser } from "../redux/usersSlice";
import { useRef } from "react";
import socket from "../socket-frontend/socket";
import { incrementUnread } from "../redux/usersSlice";

const MessageArea = () => {
  const [inputMessage, setInputMessage] = useState("");

  const { selectedUser, userData, onlineUsers, unreadMessages } = useSelector(
    (state) => state.user,
  );
  const isOnline = onlineUsers.includes(selectedUser?._id);

  const { messages } = useSelector((state) => state.message);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      const res = await axios.post(
        `https://quickchat-backend-zxkb.onrender.com/api/message/send/${selectedUser._id}`,
        {
          messages: inputMessage,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(setMessages([...messages, res.data]));
      setInputMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleNewMessage = (message) => {
      // Message belongs to the currently open chat
      if (selectedUser?._id === message.sender.toString()) {
        dispatch(setMessages([...messages, message]));
      } else {
        // Message belongs to another chat
        dispatch(incrementUnread(message.sender.toString()));
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [selectedUser, messages, dispatch]);
  return (
    <div
      className={`${
        selectedUser ? "flex" : "hidden md:flex"
      } md:w-[70%] w-full h-screen bg-[#F8FAFC] dark:bg-[#0F172A] flex-col overflow-hidden`}
    >
      {selectedUser ? (
        <>
          {/* Header */}
          <div className="bg-white dark:bg-[#0F172A] border-b border-[#E2E8F0] dark:border-[#334155] flex items-center gap-4 p-4 shadow-sm">
            <FaArrowLeft
              className="text-[#1E293B] dark:text-[#F8FAFC] flex md:hidden cursor-pointer"
              onClick={() => dispatch(setSelectedUser(null))}
            />

            {/* User image */}
            <div className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] rounded-full overflow-hidden shadow-md shadow-gray-300 dark:shadow-[#1E293B] shrink-0">
              <img
                src={
                  selectedUser?.profile ||
                  "https://placehold.co/200x200?text=User"
                }
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* User details */}
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-[#1E293B] dark:text-[#F8FAFC] text-[1rem] md:text-[1.1rem] font-semibold truncate">
                {selectedUser?.name || "User"}
              </h1>

              <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                {/* Icon */}
                <div className="w-28 h-28 rounded-full bg-[#DBEAFE] dark:bg-[#1E293B] flex items-center justify-center">
                  <span className="text-5xl">💬</span>
                </div>

                <h2 className="mt-6 text-3xl font-bold text-[#1E293B] dark:text-white">
                  No messages yet
                </h2>

                <p className="mt-2 text-[#64748B] dark:text-[#94A3B8] text-base">
                  Say hello 👋 to start the conversation!
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((message) => {
                  const time = new Date(message.createdAt).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    },
                  );

                  const isSender =
                    message.sender.toString() === userData._id.toString();

                  return isSender ? (
                    <SenderMessage
                      key={message._id}
                      time={time}
                      message={message.messages}
                    />
                  ) : (
                    <ReceiverMessage
                      key={message._id}
                      time={time}
                      message={message.messages}
                    />
                  );
                })}

                <div ref={scrollRef}></div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="p-3 md:p-4 bg-white dark:bg-[#0F172A] border-t border-[#E2E8F0] dark:border-[#334155]">
            <div className="flex items-center rounded-full bg-gray-100 dark:bg-[#1E293B] border dark:border-[#334155] border-gray-300 focus-within:ring-2 focus-within:ring-[#2563EB] px-2">
              <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                type="text"
                placeholder="Type a message..."
                className="py-3 px-3 flex-1 bg-transparent outline-none text-sm md:text-base dark:text-[#F8FAFC]"
              />

              {inputMessage.length > 0 && (
                <button
                  onClick={handleSendMessage}
                  className="h-[40px] w-[40px] rounded-full flex justify-center items-center text-white bg-[#2563EB] hover:bg-[#1D4ED8] cursor-pointer active:scale-95 transition-all shrink-0"
                >
                  <IoSend />
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full px-4 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-[#2563EB]">
            Select a user to start chatting!
          </h1>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
