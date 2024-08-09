/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import AttachmentIcon from "../../../assets/svgs/tasks/AttachmentIcon";
import CommentIcon from "../../../assets/svgs/tasks/CommentIcon";
import ThreeDotsIcon from "../../../assets/svgs/tasks/ThreeDotsIcon";
import UserIcon from "../../../assets/svgs/tasks/UserIcon";
import { taskTimeLeft } from "../../../utils/taskTimeCalculator";

const InprogressCard = ({ task }) => {
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
        <div className="cursor-pointer">
          <ThreeDotsIcon />
        </div>
      </div>
      <div className="mt-2">
        <h2 className="text-base md:text-[18px] font-semibold text-[#000] capitalize">{task?.title}</h2>
        <p className="mt-2 text-[11px] sm:text-xs">{task?.description}</p>
        <div>
          <div className="flex items-center justify-between mt-3">
            <h6 className="text-[11px] sm:text-xs text-primary font-medium md:font-semibold">Time Left</h6>
            <p className="text-[11px] sm:text-xs text-primary">
              {/* find how much time left acording task.End date and curunt time  */}
              {taskTimeLeft(task?.endDate)}
            </p>
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

export default InprogressCard;
