import React from "react";

const SenderMessage = ({ message,time }) => {

  return (
    <div className="flex justify-end">
      <div className="bg-[rgb(37,99,235)] dark:bg-[#1E293B] text-white h-fit px-4 py-2 rounded-2xl rounded-br-md max-w-[90%]">
        {message && (
          <p className="flex flex-col break-words text-xs md:text-[1rem]">
            {message}
            <span className="text-[0.6rem] text-end">{time}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SenderMessage;
