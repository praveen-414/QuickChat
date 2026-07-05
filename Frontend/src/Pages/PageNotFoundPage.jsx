import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PageNotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#EFF6FF] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl w-full">
        {/* 404 Text */}
        <h1 className="lg:text-[10rem] md:text-[7rem] text-[6rem] font-bold text-[#2563EB] leading-none">
          404
        </h1>

        {/* Heading */}
        <h2 className="sm:text-3xl md:text-5xl lg:text-5xl text-2xl font-bold text-[#1E293B] mt-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-[#64748B] text-lg mt-3">
          Oops! The page you’re looking for doesn’t exist
          <br />
          or has been moved.
        </p>

        {/* Button */}
        <Link to="/">
          <button className="mt-8 inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-md active:scale-90 cursor-pointer">
            <FaArrowLeft size={20} />
            Go Back Home
          </button>
        </Link>
        {/* Illustration */}
        <div className="mt-8 flex justify-center">
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-10 w-full max-w-xl shadow-sm">
            {/* Fake Browser Top */}
            <div className="flex gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-[#DBEAFE]" />
              <div className="w-3 h-3 rounded-full bg-[#DBEAFE]" />
              <div className="w-3 h-3 rounded-full bg-[#DBEAFE]" />
            </div>

            {/* Sad Face */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-4 border-[#64748B] flex items-center justify-center">
                <span className="text-5xl text-[#64748B]">☹</span>
              </div>

              {/* Lines */}
              <div className="w-56 h-3 bg-[#DBEAFE] rounded-full mt-8" />
              <div className="w-40 h-3 bg-[#DBEAFE] rounded-full mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFoundPage;
