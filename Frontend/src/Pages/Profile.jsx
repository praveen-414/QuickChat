import React, { useState, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { MdEdit, MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUsersData } from "../redux/usersSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import { IoArrowBackSharp } from "react-icons/io5";
import { setTheme } from "../redux/themeSlice";
import { logOut } from "../redux/usersSlice";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const { userData } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [updateName, setUpdateName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.name) {
      setUpdateName(userData.name);
    }
  }, [userData]);
  const updateProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", updateName);

      if (profile) {
        formData.append("profile", profile);
      }

      const res = await axios.put(
        "https://quickchat-iz3s.onrender.com/api/user/profile",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      dispatch(setUsersData(res.data.user));

      toast.success(res.data.message);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async (req, res) => {
    try {
      const res = await axios.get(
        "https://quickchat-iz3s.onrender.com/api/auth/logout",
        {
          withCredentials: true,
        },
      );
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className=" flex  h-screen">
        {/* left  */}

        <div className="w-full md:max-w-[35%] lg:max-w-[30%] h-screen bg-white dark:bg-[#111827] border-r border-[#E2E8F0] p-5 flex flex-col gap-15 px-7 relative dark:border-[#334155]">
          <div className="flex items-center gap-5">
            <Link to="/">
              {" "}
              <IoArrowBackSharp
                className="text-[#1E293B] dark:text-[#F8FAFC]"
                size={18}
              />
            </Link>

            <h1 className="text-[#2563EB] text-2xl md:text-3xl lg:text-3xl font-bold ">
              Profile
            </h1>
            <hr />
          </div>

          <div className="flex flex-col w-full h-full items-center gap-5">
            <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden shadow-md shadow-gray-400 dark:shadow-[#1E293B]">
              <img
                src={
                  profilePreview ||
                  userData?.profile ||
                  "https://placehold.co/200x200?text=User"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />

              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setProfile(file);
                  setProfilePreview(URL.createObjectURL(file));
                }}
              />
            </div>
            <form
              className={`flex w-full p-3 rounded-2xl bg-gray-100 dark:bg-[#1E293B] dark:border-[#334155] ${
                !isReadOnly && "focus-within:ring-2 focus-within:ring-[#2563EB]"
              }`}
            >
              <input
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
                type="text"
                readOnly={isReadOnly}
                placeholder="Name"
                className="w-full outline-none dark:text-[#F8FAFC]"
              />

              <button
                className="cursor-pointer dark:text-[#F8FAFC]"
                onClick={(e) => {
                  e.preventDefault();
                  setIsReadOnly(false);
                }}
              >
                <MdEdit />
              </button>
            </form>
            <button
              disabled={loading}
              onClick={updateProfile}
              className="
          w-full
                    mt-3
                    bg-[#2563EB]
                    hover:bg-blue-700
                    text-white
                    py-3
                    rounded-2xl
                    transition-all
                    duration-300
                    shadow-md
                    active:scale-95
                    cursor-pointer
                  "
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <div
              onClick={() => dispatch(setTheme())}
              className="flex items-center justify-between w-full shadow-md rounded-lg p-3 cursor-pointer hover:bg-[#DBEAFE] dark:text-[#F8FAFC] dark:hover:bg-[#1E40AF] dark:border dark:border-[#334155]"
            >
              <h1>{theme === "Light" ? "Dark Mode" : "Light Mode"}</h1>
              <span>
                {theme === "Light" ? (
                  <MdOutlineDarkMode size={20} color="#7C3AED" />
                ) : (
                  <MdOutlineLightMode size={20} color="#FACC15" />
                )}
              </span>
            </div>
          </div>
          <span
            onClick={handleLogout}
            className="absolute bottom-8 bg-[#2563EB] p-2 rounded-full text-white flex justify-center items-center cursor-pointer z-10"
          >
            <BiLogOut size={20} />
          </span>
        </div>
        {/* right  */}

        <div className="hidden md:flex flex-1 dark:bg-[#0F172A] items-center justify-center px-8">
          <div className="text-center max-w-lg">
            <div className="w-36 h-36 mx-auto rounded-full bg-[#DBEAFE] dark:bg-[#1E293B] flex items-center justify-center shadow-lg">
              <span className="text-6xl">👤</span>
            </div>

            <h1 className="mt-8 text-5xl font-bold text-[#1E293B] dark:text-white">
              Your Profile
            </h1>

            <p className="mt-4 text-lg text-[#64748B] dark:text-[#94A3B8] leading-8">
              Update your name or profile picture to personalize your QuickChat
              account.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
