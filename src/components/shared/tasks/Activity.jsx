/* eslint-disable react/prop-types */
import { useState } from "react";
import CrossIcon from "../../../assets/svgs/modal/CrossIcon";
import { getTimeAgo } from "../../../utils/formatting";

const Activity = ({ activities }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(activities[0]);

  const handleModalOpen = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(!isModalOpen);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="mt-9 bg-white rounded-[4px] p-4">
        <h4 className="font-semibold text-sm text-[#333333]">Activity</h4>
        <div className="mt-3 flex flex-col gap-2">
          {activities.map((activity, i) => (
            <div className="flex gap-2 cursor-pointer" key={i} onClick={() => handleModalOpen(activity)}>
              <img
                src={activity?.user?.image.url}
                alt=""
                className="w-9 h-9 border-[1px] border-blue rounded-full object-contain flex items-center justify-center bg-[#c6f7ff] "
              />
              <div className="flex flex-col">
                <p className="text-[12px] text-[#333333]">{activity.title}</p>
                <span className="text-[9px] text-[#8a3a3a]">{getTimeAgo(activity.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && <ActivityModal data={selectedActivity} onclose={handleClose} />}
    </>
  );
};

export default Activity;

const ActivityModal = ({ onclose, data }) => {
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm drop-shadow-2xl w-full py-4 flex items-center justify-center z-50 transition-all duration-500"
      onClick={onclose}
    >
      <div
        className="p-4 bg-white rounded-md w-[300px] md:w-[420px] overflow-y-scroll scrollbar-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[7px]">
            <h5 className="text-sm font-semibold">{data?.title}</h5>
          </div>
          <div className="cursor-pointer" onClick={onclose}>
            <CrossIcon />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-4">
            <img
              src={data?.user?.image.url}
              className="text-[12px] w-16 h-16 bg-[#016a7a14] rounded-[50%] border-[2px] border-gray-500 mt-1"
            />
            <div className="flex flex-col text-primary justify-center gap-1">
              <h6>{data?.user?.name}</h6>
              <h6 className="text-[10px]">{data?.user?.email}</h6>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <h6 className="text-[10px] text-primary">Message</h6>
            <p className="text-[10px] text-primary font-medium">Added : {getTimeAgo(data?.createdAt)}</p>
          </div>
          <p
            className={`text-[12px] font-medium rounded-[4px] px-[15px] py-[12px] mt-1 ${
              data.type == "task"
                ? "bg-[#577df852]"
                : data.type == "comment"
                ? "bg-[#a5f85762]"
                : "bg-[#f3ab585d]"
            }`}
          >
            {data?.message}
          </p>
        </div>
      </div>
    </div>
  );
};
