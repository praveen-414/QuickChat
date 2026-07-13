import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/usersSlice";
import { useState, useEffect } from "react";
const SideBar = () => {
  const {
    userData,
    otherUsersData,
    selectedUser,
    onlineUsers,
    unreadMessages,
  } = useSelector((state) => state.user);

  const [searchChats, setSearchChats] = useState("");

  const filteredChats = otherUsersData?.filter((otherUser) =>
  otherUser.name.toLowerCase().includes(searchChats.toLowerCase())
) || [];

  const dispatch = useDispatch();

  const [messageCount, setMessageCount] = useState(0);

  return (
    <div
      className={`${
        selectedUser ? "hidden md:flex" : "flex"
      } w-full md:w-[30%] h-full bg-white dark:bg-[#111827] border-r border-[#E2E8F0] dark:border-[#334155] p-4 flex-col gap-5 overflow-hidden`}
    >
      {/* Logo */}
      <h1 className="text-[#2563EB] dark:text-[#F8FAFC] text-2xl md:text-3xl font-bold">
        QuickChat
      </h1>

      {/* Logged in user */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-xl font-semibold text-[#1E293B] dark:text-[#F8FAFC] truncate">
          Hii, <span>{userData?.name}</span>
        </h1>

        {/* Profile */}
        <Link to="profile">
          <div className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] rounded-full shadow-md shadow-gray-300 dark:shadow-[#1E293B] overflow-hidden shrink-0">
            <img
              src={
                userData?.profile || "https://placehold.co/200x200?text=User"
              }
              alt="profile"
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
        </Link>
      </div>

      {/* Search input */}
      <div className="flex items-center rounded-full bg-gray-100 dark:bg-transparent border border-gray-300 dark:border-[#334155] focus-within:ring-2 focus-within:ring-[#2563EB]">
        <FaSearch className="ml-4 text-[#475569] dark:text-[#94A3B8]" />

        <input
          type="search"
          value={searchChats}
          onChange={(e) => setSearchChats(e.target.value)}
          placeholder="Search..."
          className="py-2 px-3 rounded-full outline-none flex-1 bg-transparent text-sm md:text-base dark:text-[#F8FAFC]"
        />
      </div>

      {/* Chats section */}
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
        {filteredChats?.map((otherUser) => {
          const isOnline = onlineUsers.includes(otherUser._id);
          return (
            <div
              key={otherUser._id}
              onClick={() => dispatch(setSelectedUser(otherUser))}
              className="flex items-center gap-4 hover:bg-[#DBEAFE] dark:hover:bg-[#1E40AF] shadow-xs px-3 py-3 rounded-2xl transition-all cursor-pointer"
            >
              {/* User image */}
              <div className="w-[50px] h-[50px] rounded-full shadow-md shadow-gray-300 dark:shadow-[#1E293B] overflow-hidden shrink-0">
                <img
                  src={
                    otherUser?.profile ||
                    "https://placehold.co/200x200?text=User"
                  }
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User info */}
              <div className="flex flex-col overflow-hidden justify-between w-full">
                <h1 className="text-[#1E293B] dark:text-[#F8FAFC] text-[1rem] md:text-[1.1rem] font-medium truncate">
                  {otherUser?.name || "User"}
                </h1>

                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
              <span className="w-full flex justify-end">
                {unreadMessages[otherUser._id] > 0 && (
                  <div className="bg-[#2563EB] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    {unreadMessages[otherUser._id]}
                  </div>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
