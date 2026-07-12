import React from "react";
import { Link, useNavigate } from "react-router-dom";
import signUpImg from "../assets/signUp.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUsersData } from "../redux/usersSlice";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("All fields are required...!");
    }
    try {
      const res = await axios.post(
        "https://quickchat-lxda.onrender.com/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(setUsersData(res.data.user));
      navigate("/");
      toast.success("Logged in successfylly...!");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-[#EFF6FF] dark:bg-[#0F172A] flex justify-center items-center p-4">
      {/* Card */}
      <div
        className="
              bg-white
              w-full
              max-w-5xl
              rounded-2xl
              shadow-lg
              overflow-hidden
              grid
              grid-cols-1
              md:grid-cols-2
            "
      >
        {/* Image Section */}
        <div className="hidden md:flex justify-center items-center p-6 bg-blue-50">
          <img
            src={signUpImg}
            alt="signup"
            className="w-full max-w-md object-contain"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center p-6 sm:p-10 dark:bg-[#0F172A]">
          <h1 className="text-[#2563EB] font-extrabold text-3xl sm:text-4xl mb-8">
            Welcome! <br /> Login
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="outline-none p-3 rounded-2xl bg-gray-100 dark:bg-[#1E293B] dark:border dark:border-[#334155] focus:ring-2 focus:ring-[#2563EB] dark:text-[#F8FAFC]"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="outline-none p-3 rounded-2xl bg-gray-100 dark:bg-[#1E293B] dark:border dark:border-[#334155] focus:ring-2 focus:ring-[#2563EB] dark:text-[#F8FAFC]"
            />

            <p className="text-sm text-[#64748B] dark:text-[#94A3B8] font-medium">
              Don't have an account?
              <Link to="/signup">
                <span className="ml-1 font-bold text-[#2563EB] cursor-pointer">
                  Sign up
                </span>
              </Link>
            </p>

            <button
              className="
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
