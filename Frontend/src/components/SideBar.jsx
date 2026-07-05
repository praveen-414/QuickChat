import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/usersSlice";
const SideBar = () => {
  const { userData, otherUsersData, selectedUser } = useSelector(
    (state) => state.user,
  );

  const dispatch = useDispatch();

  return (
    <div
      className={`${
        selectedUser ? "hidden md:flex" : "flex"
      } w-full md:w-[30%] h-screen bg-white dark:bg-[#111827] border-r border-[#E2E8F0] dark:border-[#334155] p-4 flex-col gap-5 overflow-hidden`}
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
              src="https://imgs.search.brave.com/CGEARpFVtU6PvMBCXIl1a9JYJGQK8xOzcLi_lE8mE4M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjEz/NTkxMTUzNi9waG90/by9wcm9maWxlLXZp/ZXctb2YtYS1yZXRp/cmVkLWFzaWFuLWhp/a2VyLWF0LW11cml3/YWktYmVhY2guanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXNv/Z1NUUEdLZmUxc3pi/MkVwVXRud2RlMmRB/V09KYXdSOUdMZDd4/R2dYQ0k9"
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
          placeholder="Search..."
          className="py-2 px-3 rounded-full outline-none flex-1 bg-transparent text-sm md:text-base dark:text-[#F8FAFC]"
        />
      </div>

      {/* Chats section */}
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
        {otherUsersData?.map((otherUser) => {
          return (
            <div
              key={otherUser._id}
              onClick={() => dispatch(setSelectedUser(otherUser))}
              className="flex items-center gap-4 hover:bg-[#DBEAFE] dark:hover:bg-[#1E40AF] shadow-xs px-3 py-3 rounded-2xl transition-all cursor-pointer"
            >
              {/* User image */}
              <div className="w-[50px] h-[50px] rounded-full shadow-md shadow-gray-300 dark:shadow-[#1E293B] overflow-hidden shrink-0">
                <img
                  src="https://imgs.search.brave.com/CGEARpFVtU6PvMBCXIl1a9JYJGQK8xOzcLi_lE8mE4M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjEz/NTkxMTUzNi9waG90/by9wcm9maWxlLXZp/ZXctb2YtYS1yZXRp/cmVkLWFzaWFuLWhp/a2VyLWF0LW11cml3/YWktYmVhY2guanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXNv/Z1NUUEdLZmUxc3pi/MkVwVXRud2RlMmRB/V09KYXdSOUdMZDd4/R2dYQ0k9"
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User info */}
              <div className="flex flex-col overflow-hidden">
                <h1 className="text-[#1E293B] dark:text-[#F8FAFC] text-[1rem] md:text-[1.1rem] font-medium truncate">
                  {otherUser?.name || "User"}
                </h1>

                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                  Online
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
