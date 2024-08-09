/* eslint-disable react/prop-types */
import UserIcon from "../../../assets/svgs/tasks/UserIcon";
import ThreeDotsIcon from "../../../assets/svgs/tasks/ThreeDotsIcon";
import CommentIcon from "../../../assets/svgs/tasks/CommentIcon";
import AttachmentIcon from "../../../assets/svgs/tasks/AttachmentIcon";
import CheckIcon from "../../../assets/svgs/tasks/CheckIcon";
import { Link } from "react-router-dom";
import { taskTimeLeft } from "../../../utils/taskTimeCalculator";

const FinishedCard = ({ task }) => {
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
        <h2 className="line-through text-[#00000066] text-base md:text-[18px] font-semibold capitalize">
          {task?.title}
        </h2>
        <p className="mt-2 text-[11px] sm:text-xs">{task?.description}</p>
        <div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1">
              <CheckIcon />
              <h6 className="text-[11px] sm:text-xs text-[#40a737] font-medium md:font-semibold">
                {`${taskTimeLeft(task?.endDate)}`}
              </h6>
            </div>
            <p className="text-[10px] sm:text-[11px] text-white px-2 py-1 rounded-full bg-[#40a737]">
              Completed
            </p>
          </div>
          <div className="mt-4 w-full h-[8px] rounded-[6px] bg-[#40a737] relative"></div>
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
              <p className="text-xs"> {task?.attachments?.length || 0} </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FinishedCard;
