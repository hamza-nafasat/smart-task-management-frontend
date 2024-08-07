import EditIcon from "../../../assets/svgs/tasks/EditIcon";
import AlertIcon from "../../../assets/svgs/tasks/AlertIcon";
import TimeIcon from "../../../assets/svgs/tasks/TimeIcon";
import WatchIcon from "../../../assets/svgs/tasks/WatchIcon";
import UsersIcon from "../../../assets/svgs/tasks/UsersIcon";
import dp from "../../../assets/images/tasks/dp.png";
import TaskAttachments from "./TaskAttachments";
import Comments from "./Comments";
import Activity from "./Activity";

const TaskDetail = () => {
  return (
    <div className="p-4 md:p-5 relative z-10">
      <div className="rounded-[10px] bg-[#eef2f599] p-4 xl:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Task Detail</h2>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="cursor-pointer">
              <EditIcon />
            </div>
            <p className="bg-[#ff9500] p-3 rounded-[10px] text-white">In Progress</p>
          </div>
        </div>
        <div className="mt-4 md:mt-5 bg-[#f8f8f8cc] rounded-[10px] px-4 xl:px-6 py-6 xl:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-[#ffdada] py-[6px] px-[10px] rounded-md text-base font-semibold text-[#ff5b5b]">
              <AlertIcon />
              Task Is Overdued
            </div>
            <div className="flex items-center gap-1 bg-[#00677717] py-[6px] px-[10px] rounded-md text-base font-semibold text-primary">
              <TimeIcon />
              Time Left : <span>2h 30m 33s</span>
            </div>
          </div>
          <div className="grid md:grid-cols-12 gap-4 xl:gap-8 mt-3">
            <div className="col-span-7">
              <h2 className="text-lg xl:text-2xl font-semibold">Mobile App UI Design</h2>
              <p className="mt-4 text-xs text-[#00000080]">Description</p>
              <p className="mt-2 text-xs">
                Create a design system for a hero section in 2 different variants. Create a simple
                presentation with these components. a design system for a hero section in 2 different
                variants. Create a simple presentation with these components.
              </p>
              <div className="flex flex-col gap-3 mt-4 md:mt-6">
                <div className="flex items-center">
                  <div className="flex items-center gap-[6px] basis-[20%]">
                    <div className="w-3 h-3 bg-[#ff9500] rounded-full"></div>
                    <div className="text-xs">Project</div>
                  </div>
                  <div className="text-xs font-semibold text-[#ff9500]">Mobile AppDevelopment</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center gap-[6px] basis-[20%]">
                    <WatchIcon />
                    <div className="text-xs">Due Date</div>
                  </div>
                  <div className="text-xs font-semibold text-primary">5 March 2024</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center gap-[6px] basis-[20%]">
                    <UsersIcon />
                    <div className="text-xs">Assignee</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-1">
                    <div className="flex items-center gap-1 bg-primary px-1 py-[6px] rounded-md">
                      <img src={dp} alt="profile image" className="w-6 h-6 rounded-full object-cover" />
                      <p className="text-[10px] font-semibold text-white">Muhammad Zain</p>
                    </div>
                    <div className="flex items-center gap-1 bg-primary px-1 py-[6px] rounded-md">
                      <img src={dp} alt="profile image" className="w-6 h-6 rounded-full object-cover" />
                      <p className="text-[10px] font-semibold text-white">Muhammad Zain</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-5">
              <TaskAttachments />
            </div>
          </div>
          {/* divider */}
          <div className="my-4 w-full h-[0.4px] bg-[#00000080]"></div>
          {/* divider */}
          <div className="grid lg:grid-cols-12 gap-4">
            <div className="lg:col-span-9">
              <Comments />
            </div>
            <div className="lg:col-span-3">
              <Activity />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
