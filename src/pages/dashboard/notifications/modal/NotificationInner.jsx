import React, { useState } from "react";
import { comments } from "../../../../data/data";
import { Link } from "react-router-dom";

const NotificationSlider = ({openModal}) => {
  
  return (
    <>
      <div className="bg-white rounded-[4px] px-4 pt-4 h-[300px] overflow-y-scroll notification-scroll">
        <h4 className="font-semibold text-sm text-[#333333]">Notifications</h4>
        <div className="mt-3 flex flex-col gap-2">
          {comments.map((comment, i) => (
            <div
              className="flex gap-2 cursor-pointer"
              key={i}
              onClick={() => openModal(comment.type)}
            >
              <h6 className="w-7 h-7 p-2 rounded-full object-cover flex items-center justify-center text-[10px] font-semibold bg-[#c6f7ff] text-[#17a2b8]">
                {comment.abbr}
              </h6>
              <div className="flex flex-col">
                <p className="text-[10px] text-[#333333]">
                  <span className="font-semibold">{comment.name}</span>{" "}
                  {comment.comment}
                </p>
                <span className="text-[8px] text-[#8a3a3a]">
                  {comment.time}
                </span>
              </div>
            </div>
          ))}
        </div>
        <Link className="block mt-3 py-2 w-full backdrop-blur-sm font-medium text-center text-sm sticky bottom-0 left-0 text-primary" to='notifications'>See all Notifications</Link>
      </div>
    </>
  );
};

export default NotificationSlider;
