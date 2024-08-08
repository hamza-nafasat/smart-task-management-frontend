import React from "react";
import SingleComment from "./SingleComment";
import SendIcon from '../../../assets/svgs/tasks/SendIcon'


const Comments = () => {
  return (
    <div>
      <p className="text-xs md:text-sm text-[#00000080] font-medium">Comments ( 2 )</p>
      <div className="flex flex-col gap-4 mt-4">
        <SingleComment />
        <SingleComment />
      </div>
      <div className="flex items-center gap-3 mt-3 rounded-[4px] border border-primary p-2 md:py-3 md:px-4">
        <input
          type="text"
          placeholder="Write your comment here"
          className="w-full focus:outline-none bg-transparent text-[11px] md:text-[13px] text-[#33333380]"
        />
        <SendIcon />
      </div>
    </div>
  );
};

export default Comments;
