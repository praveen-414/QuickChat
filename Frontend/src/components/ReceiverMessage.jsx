import React from "react";

const ReceiverMessage = ({message, time}) => {

  return (
    <div className="flex justify-start">
      <div className="h-fit px-4 py-2 rounded-2xl rounded-bl-md max-w-[50%] bg-gray-200 dark:bg-[#1E293B] text-[#1E293B] border border-[#E2E8F0] dark:border-[#334155]">
        {message && (
          <p className="flex flex-col break-words text-xs  md:text-[1rem] dark:text-[#F8FAFC]">
            {message}
            <span className="text-[0.6rem] text-end text-gray-500 dark:text-[#94A3B8]">{time}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ReceiverMessage;
