/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import AlertIcon from "../../../assets/svgs/tasks/AlertIcon";
import AttachmentIcon from "../../../assets/svgs/tasks/AttachmentIcon";
import CommentIcon from "../../../assets/svgs/tasks/CommentIcon";
import UserIcon from "../../../assets/svgs/tasks/UserIcon";
import { getPercentTimeCompleted } from "../../../utils/features";
import { taskTimeLeft } from "../../../utils/formatting";

const InprogressCard = ({ task }) => {
  return (
    <Link
      to={`/dashboard/tasks/${task?._id}`}
      className={` rounded-[20px] p-4 lg:p-6 cursor-pointer bg-[#f8f8f8cc]`}
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
        <h2
          className={`text-base md:text-[18px] font-semibold capitalize text-[#000]
          }`}
        >
          {task?.title}
        </h2>
        <p className={`mt-2 text-[11px] sm:text-xs text-[#000]`}>{task?.description}</p>
        <div>
          <div className="flex items-center justify-between mt-3">
            {task.isSubmitted ? (
              <>
                <h6 className="text-[11px] sm:text-xs text-primary font-medium md:font-semibold">Status</h6>
                <p className="text-[11px] sm:text-sm text-[#fff] bg-[#40a737] px-[8px] py-[4px] rounded-full">
                  Task Submitted
                </p>
              </>
            ) : taskTimeLeft(task?.endDate) ? (
              <>
                <h6 className="text-[11px] sm:text-xs text-primary font-medium md:font-semibold">
                  Time Left
                </h6>
                <p className="text-[11px] sm:text-xs text-primary">
                  {/* find how much time left according task.End date and current time  */}
                  {taskTimeLeft(task?.endDate)}
                </p>
              </>
            ) : (
              <>
                <h6 className="text-[11px] sm:text-xs text-primary font-medium md:font-semibold">
                  Time Left
                </h6>
                <div className="flex items-center gap-1 px-2 py-2 md:py-[6px] md:px-[10px] rounded-md text-[10px] sm:text-sm md:text-base font-medium md:font-semibold text-[#ff5b5b]">
                  <AlertIcon />
                  Task Is Overdued
                </div>
              </>
            )}
          </div>
          <div className="mt-4 w-full h-[8px] rounded-[6px] bg-[#17a2b829] relative">
            <div
              className="absolute h-[8px] rounded-[6px]"
              style={{
                background: "rgba(23, 162, 184, 1)",
                width: `${getPercentTimeCompleted(task?.startDate, task?.endDate)}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 mt-4">
          <div className="flex">
            {task.assignee?.map((assignee, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border border-[#ffffff] bg-[#fff] text-white text-xs flex items-center justify-center"
              >
                <img className="w-8 h-8 rounded-full" src={assignee?.image?.url} alt={assignee?.username} />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <CommentIcon />
              <p className="text-xs">{task?.commentsCount || 0}</p>
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
