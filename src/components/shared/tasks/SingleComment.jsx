import React, { useState } from "react";
import dp from "../../../assets/images/tasks/commentdp.jpeg";

const SingleComment = () => {
  const [isReplyActive, setIsReplyActive] = useState(false);
  const [isReplyViewActive, setIsReplyViewActive] = useState(false);
  const handleReplyActive = () => {
    setIsReplyActive(!isReplyActive);
  };
  const handleReplyView = () => {
    setIsReplyViewActive(!isReplyViewActive);
  };
  return (
    <div className="p-[10px] bg-[#016a7a0d] rounded-md flex gap-2 transition-all duration-500">
      <img
        src={dp}
        alt="image"
        className="w-7 h-7 rounded-full object-cover border border-primary"
      />
      <div className="flex flex-col gap-4">
        <h6 className="text-[13px] font-semibold text-[#333333]">Brooklyn</h6>
        <p className="text-[13px] text-[#4f4f4f]">
          we are 1 week away from launch! Thank you for every team member for
          their hard work. away from launch! Thank you for every team member for
          their hard work.
        </p>
        <div className="flex items-center gap-4">
          <p className="text-xs text-[#828282]">2 hours ago</p>
          <p
            className="text-xs text-primary cursor-pointer"
            onClick={handleReplyActive}
          >
            Reply
          </p>
          <p
            className="text-xs text-primary cursor-pointer"
            onClick={handleReplyView}
          >
            View Replies (1)
          </p>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 flex items-center gap-2 ${
            isReplyActive ? "min-h-8 h-8" : "h-0 min-h-0"
          }`}
        >
          <input
            type="text"
            placeholder="Write your reply here"
            className={`bg-[#016a7a14] rounded-[4px] focus:outline-none text-xs font-light py-2 px-3 w-full`}
          />
          <button className="bg-primary rounded-md text-white text-xs py-2 px-3">
            Reply
          </button>
        </div>
        <div
          className={`bg-[#016a7a0d] rounded-md flex gap-2 overflow-hidden transition-all duration-500 ${
            isReplyViewActive ? "h-full p-[10px] opacity-100" : "h-0 opacity-0"
          }`}
        >
          <img
            src={dp}
            alt="image"
            className="w-7 h-7 rounded-full object-cover border border-primary"
          />
          <div className="flex flex-col gap-4 xl:basis-[70%]">
            <h6 className="text-[13px] font-semibold text-[#333333]">
              Brooklyn
            </h6>
            <p className="text-[13px] text-[#4f4f4f]">
              we are 1 week away from launch! Thank you for every team member
              for their hard work. away from launch! Thank you for every team
              member for their hard work.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-xs text-[#828282]">2 hours ago</p>
              <p className="text-xs text-primary cursor-pointer">Reply</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
