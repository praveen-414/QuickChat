import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { setSelectedUser } from "../redux/usersSlice";
import { useRef } from "react";
import socket from "../socket-frontend/socket";
import { incrementUnread } from "../redux/usersSlice";
import { setMessages, addMessage } from "../redux/messagesSlice";

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

    const tempMessage = {
      _id: Date.now().toString(),
      sender: userData._id,
      receiver: selectedUser._id,
      messages: inputMessage,
      createdAt: new Date().toISOString(),
    };

    // Show instantly
    dispatch(addMessage(tempMessage));

    const messageText = inputMessage;
    setInputMessage("");

    try {
      await axios.post(
        `https://quickchat-iz3s.onrender.com/api/message/send/${selectedUser._id}`,
        {
          messages: messageText,
        },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleNewMessage = (message) => {
      if (selectedUser?._id === message.sender.toString()) {
        dispatch(addMessage(message));
      } else {
        dispatch(incrementUnread(message.sender.toString()));
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [selectedUser, dispatch]);
  return (
    <div
      className={`${
        selectedUser ? "flex" : "hidden md:flex"
      } md:w-[70%] w-full h-full bg-[#F8FAFC] dark:bg-[#0F172A] flex-col overflow-hidden`}
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
        <div className="flex flex-col items-center justify-center h-full text-center relative overflow-hidden px-6">

  {/* Background Blur */}
  <div className="absolute w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-40"></div>

  {/* Main Illustration */}
  <div className="relative z-10">

    <div className="relative">

      {/* Circle */}
      <div className="w-48 h-48 rounded-full bg-[#DBEAFE] dark:bg-[#1E293B] flex items-center justify-center shadow-xl">

        <img
          src="/chat-illustration.png"   // put your illustration here
          alt="chat"
          className="w-36"
        />

      </div>

      {/* Floating Elements */}
      <span className="absolute -top-4 -left-4 text-3xl">✨</span>
      <span className="absolute top-4 -right-6 text-2xl">💙</span>
      <span className="absolute bottom-4 -left-6 text-xl">💬</span>

    </div>

    <h1 className="mt-10 text-5xl font-bold text-[#1E293B] dark:text-white">
      Welcome to{" "}
      <span className="text-[#2563EB]">
        QuickChat
      </span>
    </h1>

    <p className="mt-5 text-lg text-[#64748B] dark:text-[#94A3B8] max-w-lg leading-8">
      Choose a conversation from the sidebar
      <br />
      to start chatting with your friends in real time.
    </p>

    {/* Paper Plane */}
    <div className="mt-10 flex justify-center">
      <svg
        width="130"
        height="40"
        viewBox="0 0 130 40"
        fill="none"
      >
        <path
          d="M5 20 C40 55 80 -15 120 20"
          stroke="#60A5FA"
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
        />
      </svg>

      <span className="-ml-2 text-3xl rotate-12">
        ✈️
      </span>
    </div>

  </div>
</div>
      )}
    </div>
  );
};

export default MessageArea;
