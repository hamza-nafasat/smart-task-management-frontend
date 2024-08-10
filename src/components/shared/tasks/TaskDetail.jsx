import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AlertIcon from "../../../assets/svgs/tasks/AlertIcon";
import EditIcon from "../../../assets/svgs/tasks/EditIcon";
import TimeIcon from "../../../assets/svgs/tasks/TimeIcon";
import UsersIcon from "../../../assets/svgs/tasks/UsersIcon";
import WatchIcon from "../../../assets/svgs/tasks/WatchIcon";
import { getSingleTaskAction, getSingleTaskAllCommentsAction } from "../../../redux/actions/tasksActions";
import { isTaskEndTimeEnded, taskTimeLeft } from "../../../utils/formatting";
import Activity from "./Activity";
import Comments from "./Comments";
import TaskAttachments from "./TaskAttachments";

const TaskDetail = () => {
  const params = useParams();
  const taskId = params?.taskId;
  const dispatch = useDispatch();
  const { singleTask, singleTaskComments } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (taskId) {
      dispatch(getSingleTaskAction(taskId));
      dispatch(getSingleTaskAllCommentsAction(taskId));
    }
  }, [dispatch, taskId]);

  return (
    <div className="p-4 md:p-5 relative z-10">
      <div className="rounded-[10px] bg-[#eef2f599] p-2 md:p-4 xl:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm md:text-base font-semibold">Task Detail</h2>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="cursor-pointer">
              <EditIcon />
            </div>
            <p className="bg-[#ff9500] text-xs md:text-base p-3 rounded-[10px] text-white">
              {singleTask?.status}
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-5 bg-[#f8f8f8cc] rounded-[10px] px-2 md:px-4 xl:px-6 py-6 xl:py-8">
          <div className="flex items-center justify-between gap-1">
            {isTaskEndTimeEnded(singleTask?.endDate) ? (
              <div className="flex items-center gap-1 bg-[#ffdada] px-2 py-2 md:py-[6px] md:px-[10px] rounded-md text-[10px] sm:text-sm md:text-base font-medium md:font-semibold text-[#ff5b5b]">
                <AlertIcon />
                Task Is Overdued
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-[#93f8fcb6] px-2 py-2 md:py-[6px] md:px-[10px] rounded-md text-[10px] sm:text-sm md:text-base font-medium md:font-semibold text-[#336699]">
                <WatchIcon color="#336699" width={18} height={18} />
                Task is on time
              </div>
            )}

            <div className="flex items-center gap-1 bg-[#00677717] px-2 py-2 md:py-[6px] md:px-[10px] rounded-md text-[10px] sm:text-sm md:text-base font-medium md:font-semibold text-primary">
              <TimeIcon />
              <span>{taskTimeLeft(singleTask?.endDate, singleTask?.status)}</span>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 xl:gap-8 mt-3">
            <div className="col-span-12 lg:col-span-7">
              <h2 className="text-base md:text-lg xl:text-2xl font-semibold">{singleTask?.title}</h2>
              <p className="mt-4 text-xs text-[#00000080]">Description</p>
              <p className="mt-2 text-[10px] md:text-xs">{singleTask?.description}</p>
              <div className="flex flex-col gap-3 mt-4 md:mt-6">
                <div className="flex items-center">
                  <div className="flex items-center gap-[6px] md:basis-[20%]">
                    <div className="w-2 md:w-3 h-2 md:h-3 bg-[#ff9500] rounded-full"></div>
                    <div className="text-[10px] md:text-xs">Creator</div>
                  </div>
                  <div className="text-[10px] md:text-xs font-medium md:font-semibold pl-1 text-[#ff9500]">
                    {singleTask?.creator?.name}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center gap-1 md:gap-[6px] md:basis-[20%]">
                    <WatchIcon />
                    <div className="text-[10px] md:text-xs">Due Date</div>
                  </div>
                  <div className="text-[10px] md:text-xs font-semibold text-primary pl-1">
                    {singleTask?.endDate?.split("T")[0]?.split("-").reverse().join("-")}
                  </div>
                </div>
                <div className="flex items-center gap-[2px]">
                  <div className="flex items-center gap-[6px] basis-[20%]">
                    <UsersIcon />
                    <div className="text-xs">Assignee</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-1">
                    {singleTask?.assignee?.map((assignee, i) => (
                      <div key={i} className="flex items-center gap-1 bg-primary px-1 py-[6px] rounded-md">
                        <img
                          src={assignee.image.url}
                          alt="profile image"
                          className="w-4 h-4 md:w-6 md:h-6 rounded-full object-cover"
                        />
                        <p className="text-[10px] font-normal md:font-semibold text-white">{assignee.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5">
              {singleTask && <TaskAttachments attachments={singleTask?.attachments} />}
            </div>
          </div>
          {/* divider */}
          <div className="my-4 w-full h-[0.4px] bg-[#00000080]"></div>
          {/* divider */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-9">
              <Comments taskId={taskId} comments={singleTaskComments} />
            </div>
            <div className="col-span-12 lg:col-span-3">
              <Activity />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
