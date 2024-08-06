import React, { useState } from "react";
import CrossIcon from "../../../assets/svgs/modal/CrossIcon";

const Modal = ({ title = "Create New Task", children, onClose }) => {
  return (
    <div
      className={`fixed inset-0 backdrop-blur-sm drop-shadow-2xl w-full h-full flex items-center justify-center z-[99999] transition-all duration-500`}
      onClick={onClose}
    >
      <div className="py-6 px-4 xl:px-6 xl:py-7 bg-[#eef2f5] rounded-[10px] w-[300px] sm:w-[400px] md:w-[500px] lg:w-[900px] xl:w-[1100px] h-[95%] overflow-y-scroll scrollbar-0" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-md md:text-xl text-primary font-medium">
            {title}
          </h2>
          <div className="cursor-pointer" onClick={onClose}>
            <CrossIcon />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
