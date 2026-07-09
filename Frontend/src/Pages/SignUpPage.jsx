import React from "react";
import signUpImg from "../assets/signUp.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { setUsersData } from "../redux/usersSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
      e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("passwords doesn't match...!");
    }
  setLoading(true);
    try {
      const res = await axios.post(
        "https://quickchat-backend-zxkb.onrender.com/api/auth/signup",
        {
          name,
          email,
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(setUsersData(res.data.user));
      navigate("/");
      toast.success("Registered successfully...!");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      console.log(error.message);
      console.log(error.code);
      console.log(error.response);
    }finally{
      setLoading(false);
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
            Welcome! <br /> Sign Up
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
            <input
            required
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="outline-none p-3 rounded-2xl bg-gray-100 dark:bg-[#1E293B] dark:border dark:border-[#334155] dark:text-[#F8FAFC] focus:ring-2 focus:ring-[#2563EB]"
            />

            <input
            required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="outline-none p-3 rounded-2xl bg-gray-100 dark:border dark:border-[#334155] dark:bg-[#1E293B] dark:text-[#F8FAFC] focus:ring-2 focus:ring-[#2563EB]"
            />

            <input
            required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="outline-none p-3 rounded-2xl bg-gray-100 dark:border dark:border-[#334155] dark:bg-[#1E293B] dark:text-[#F8FAFC] focus:ring-2 focus:ring-[#2563EB]"
            />

            <input
            required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="outline-none p-3 rounded-2xl bg-gray-100 dark:border dark:border-[#334155] dark:bg-[#1E293B] dark:text-[#F8FAFC] focus:ring-2 focus:ring-[#2563EB]"
            />

            <p className="text-sm text-[#64748B] dark:text-[#94A3B8] font-medium">
              Already have an account?
              <Link to="/login">
                <span className="ml-1 font-bold text-[#2563EB] cursor-pointer">
                  Login
                </span>
              </Link>
            </p>

            <button
             disabled={loading}
              type="submit"
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
             {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
