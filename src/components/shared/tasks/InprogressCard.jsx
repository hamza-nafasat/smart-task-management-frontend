import React from "react";
import { Link } from "react-router-dom";
import AttachmentIcon from "../../../assets/svgs/tasks/AttachmentIcon";
import CommentIcon from "../../../assets/svgs/tasks/CommentIcon";
import ThreeDotsIcon from "../../../assets/svgs/tasks/ThreeDotsIcon";
import UserIcon from "../../../assets/svgs/tasks/UserIcon";

const days = [
  {
    day: "Mon",
    isActive: false,
  },
  {
    day: "Tue",
    isActive: false,
  },
  {
    day: "Wed",
    isActive: true,
  },
  {
    day: "Thu",
    isActive: false,
  },
  {
    day: "Fri",
    isActive: false,
  },
  {
    day: "Sat",
    isActive: false,
  },
  {
    day: "Sun",
    isActive: false,
  },
];

const InprogressCard = () => {
  return (
    <Link
      to="/dashboard/task-details"
      className="bg-[#f8f8f8cc] rounded-[20px] p-4 lg:p-6 cursor-pointer"
    >
      {/* header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-[5px]">
          <UserIcon />
          <p className="text-[10px] leading-none font-semibold text-[#707070] flex items-center gap-1">
            Assigned By :
            <span className="font-bold text-primary">Muhammad Zain</span>
          </p>
        </div>
        <div className="cursor-pointer">
          <ThreeDotsIcon />
        </div>
      </div>
      <div className="mt-2">
        <h2
          className='text-[18px] font-semibold text-[#000]'>
          Mobile App UI Design
        </h2>
        <p className="mt-2 text-xs">
          Create a design system for a hero section in 2 different variants.
          Create a simple presentation with these components.
        </p>
        <div>
          <div className="flex items-center justify-between mt-3">
            <h6 className="text-xs text-primary font-semibold">Time Left</h6>
            <p className="text-xs text-primary">1h 30m 45s</p>
          </div>
          <div className="mt-4 w-full h-[8px] rounded-[6px] bg-[#17a2b829] relative">
            <div
              className="absolute h-[8px] rounded-[6px]"
              style={{ background: "rgba(23, 162, 184, 1)", width: "70%" }}
            ></div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 mt-4">
          <div className="flex">
            <div className="w-8 h-8 rounded-full border border-[#fff] bg-[#00569e] text-white text-xs flex items-center justify-center">
              VH
            </div>
            <div className="w-8 h-8 rounded-full border border-[#fff] bg-[#fea946] text-white text-xs flex items-center justify-center ml-[-5px]">
              AG
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <CommentIcon />
              <p className="text-xs">1.2k</p>
            </div>
            <div className="flex items-center gap-1">
              <AttachmentIcon />
              <p className="text-xs">1.2k</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InprogressCard;
