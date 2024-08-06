import React, { useState } from "react";
import { comments } from "../../../data/data";
import AlertIcon from '../../../assets/svgs/tasks/AlertIcon'
import CrossIcon from '../../../assets/svgs/modal/CrossIcon'
import { RiErrorWarningFill } from "react-icons/ri";

const Activity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen)
  }
  const handleClose = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <div className="mt-9 bg-white rounded-[4px] p-4">
        <h4 className="font-semibold text-sm text-[#333333]">Activity</h4>
        <div className="mt-3 flex flex-col gap-2">
          {comments.map((comment, i) => (
            <div className="flex gap-2 cursor-pointer" key={i} onClick={handleModalOpen}>
              <h6 className="w-7 h-7 p-2 rounded-full object-cover flex items-center justify-center text-[10px] font-semibold bg-[#c6f7ff] text-[#17a2b8]">
                {comment.abbr}
              </h6>
              <div className="flex flex-col">
                <p className="text-[10px] text-[#333333]">
                  <span className="font-semibold">{comment.name}</span>{" "}
                  {comment.comment}
                </p>
                <span className="text-[8px] text-[#8a3a3a]">{comment.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <AcitivityModal onclose={handleClose} />
      )}
    </>
  );
};

export default Activity;

const AcitivityModal = ({onclose}) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm drop-shadow-2xl w-full py-4 flex items-center justify-center z-50 transition-all duration-500" onClick={onclose}>
      <div className="p-4 bg-white rounded-md w-[300px] md:w-[420px] overflow-y-scroll scrollbar-0" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[7px]">
            <AlertIcon />
            <h5 className="text-sm font-semibold text-[#ff5a5a]">Task Name Changed</h5>
          </div>
          <div className="cursor-pointer" onClick={onclose}>
            <CrossIcon />
          </div>
        </div>
        <div className="mt-4">
          <h6 className="text-[10px] text-primary">Previous Task Name</h6>
          <p className="text-[12px] font-medium bg-[#016a7a14] rounded-[4px] px-[15px] py-[12px] mt-1">Mobile App development</p>
          <div className="flex items-center justify-between mt-4">
            <h6 className="text-[10px] text-primary">New Task Name</h6>
            <p className="text-[10px] text-primary font-medium">Updated on  : <span className="text-[#000]"> 21 July 2024  12:35 PM</span></p>
          </div>
          <p className="text-[12px] font-medium bg-[#ff5c5c14] rounded-[4px] px-[15px] py-[12px] mt-1">Website Design & Development</p>
          <div className="mt-3 flex items-center gap-1 text-[10px] text-[#868686]">
            <RiErrorWarningFill color='#000' />
            The task title has been updated to better reflect its purpose
          </div>
        </div>
      </div>
    </div>
  );
};
