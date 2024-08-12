/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import AttachmentIcon from "../../../assets/svgs/tasks/AttachmentIcon";
import CommentIcon from "../../../assets/svgs/tasks/CommentIcon";
import UserIcon from "../../../assets/svgs/tasks/UserIcon";

const days = [
  {
    day: "mon",
  },
  {
    day: "tue",
  },
  {
    day: "wed",
  },
  {
    day: "thu",
  },
  {
    day: "fri",
  },
  {
    day: "sat",
  },
  {
    day: "sun",
  },
];

const ScheduleCard = ({ task }) => {
  return (
    <Link
      to={`/dashboard/tasks/${task?._id}`}
      className="bg-[#f8f8f8cc] rounded-[20px] p-4 lg:p-6 cursor-pointer"
    >
      {/* header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-[5px]">
          <UserIcon />
          <p className="text-[10px] leading-none font-medium md:font-semibold text-[#707070] flex items-center gap-1">
            Assigned By :
            <span className="font-semibold md:font-bold text-primary">{task?.creator?.name}</span>
          </p>
        </div>
      </div>
      <div className="mt-2">
        <h2 className="text-[#000] text-base md:text-[18px] font-semibold capitalize">{task?.title}</h2>
        <p className="mt-2 text-[11px] sm:text-xs">{task?.description}</p>
        <div className="mt-3">
          <h6 className="text-[11px] sm:text-xs text-primary font-medium md:font-semibold">
            Task Will Start
          </h6>
          <div className="mt-3 flex items-center justify-between gap-2">
            {days.map((day, i) => {
              const isDayActive = task.onDay == day.day;
              return (
                <div
                  key={i}
                  className={`w-8 h-11 rounded-[2px] text-[10px] sm:text-[11px] flex items-center justify-center cursor-pointer ${
                    isDayActive ? "bg-[#17a2b8] text-white" : "bg-[#17a2b829] text-[#000]"
                  }`}
                >
                  {day.day.toUpperCase()}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 mt-4">
          <div className="flex">
            {task.assignee?.map((assignee, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border border-[#fff] bg-[#00569e] text-white text-xs flex items-center justify-center"
              >
                <img className="w-8 h-8 rounded-full" src={assignee?.image?.url} alt={assignee?.username} />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <CommentIcon />
              <p className="text-xs">{task?.comments?.length || 0}</p>
            </div>
            <div className="flex items-center gap-1">
              <AttachmentIcon />
              <p className="text-xs">{task?.attachments?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ScheduleCard;
