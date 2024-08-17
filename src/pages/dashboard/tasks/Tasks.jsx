import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import AddIcon from "../../../assets/svgs/tasks/AddIcon";
import Button from "../../../components/shared/button/Button";
import Modal from "../../../components/shared/modal/Modal";
import AddTask from "../../../components/shared/tasks/addTask/AddTask";
import FinishedCard from "../../../components/shared/tasks/FinishedCard";
import InprogressCard from "../../../components/shared/tasks/InprogressCard";
import ScheduleCard from "../../../components/shared/tasks/ScheduleCard";
import TaskColumn from "../../../components/shared/tasks/TaskColumn";
import { getAllTasksAction } from "../../../redux/actions/tasksActions";
import {
  clearTaskError,
  clearTaskMessage,
} from "../../../redux/slices/tasksSlices";
import NoTask from "../../../components/shared/tasks/NoTask";

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, message, error } = useSelector((state) => state.tasks);
  const [isModal, setIsModal] = useState(false);
  const [activeTab, setActiveTab] = useState("In Progress");

  const tabHandler = (tab) => setActiveTab(tab);
  const handleOpenModal = () => setIsModal(true);
  const handleCloseModal = () => setIsModal(false);

  useEffect(() => {
    dispatch(getAllTasksAction());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearTaskError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearTaskMessage());
    }
  }, [dispatch, error, message]);

  return (
    <React.Fragment>
      <div className="px-4 pt-4">
        <div className="p-4 bg-[#eef2f56e] rounded-[10px] flex items-center justify-between">
          <h2 className="text-md lg:text-xl font-semibold">My Tasks</h2>
          <div className="flex items-center gap-1 md:gap-2">
            <FeedbackProgressCircle percentage={70} />
            <div className="cursor-pointer" onClick={handleOpenModal}>
              <AddIcon />
            </div>
          </div>
        </div>
      </div>
      {/* layout for mobile */}
      <div className="block md:hidden p-4">
        <div className="flex items-center gap-4">
          <Button
            text="In Progress"
            bg={activeTab === "In Progress" ? "#17a2bb" : "#eef2f56e"}
            color={activeTab === "In Progress" ? "#fff" : "#000000b9"}
            height="h-[40px]"
            weight="500"
            size="text-xs sm:text-sm"
            click={() => tabHandler("In Progress")}
          />
          <Button
            text="Finished"
            bg={activeTab === "Finished" ? "#17a2bb" : "#eef2f56e"}
            color={activeTab === "Finished" ? "#fff" : "#000000b9"}
            height="h-[40px]"
            weight="500"
            size="text-xs sm:text-sm"
            click={() => tabHandler("Finished")}
          />
          <Button
            text="Scheduled"
            bg={activeTab === "Scheduled" ? "#17a2bb" : "#eef2f56e"}
            color={activeTab === "Scheduled" ? "#fff" : "#000000b9"}
            height="h-[40px]"
            weight="500"
            size="text-xs sm:text-sm"
            click={() => tabHandler("Scheduled")}
          />
        </div>
        <div className="mt-4">
          {activeTab === "In Progress" && (
            <div className="animate-slideUp">
              <TaskColumn click={handleOpenModal} title="In Progress">
                {tasks &&
                tasks.some((task) => task.status === "in-progress") ? (
                  tasks?.map((task) => {
                    if (task.status === "in-progress") {
                      return <InprogressCard key={task._id} task={task} />;
                    }
                  })
                ) : (
                  <NoTask
                    handleOpenModal={handleOpenModal}
                    status="in-progress"
                  />
                )}
              </TaskColumn>
            </div>
          )}
          {activeTab === "Finished" && (
            <div className="animate-slideUp">
              <TaskColumn title="Finished">
                {tasks && tasks.some((task) => task.status === "completed") ? (
                  tasks?.map((task) => {
                    if (task.status === "completed") {
                      return <FinishedCard key={task._id} task={task} />;
                    }
                  })
                ) : (
                  <NoTask status="completed" />
                )}
              </TaskColumn>
            </div>
          )}
          {activeTab === "Scheduled" && (
            <div className="animate-slideUp">
              <TaskColumn title="Schedule">
                {tasks && tasks.some((task) => task.status === "scheduled") ? (
                  tasks?.map((task) => {
                    if (task.status === "scheduled") {
                      return <ScheduleCard key={task._id} task={task} />;
                    }
                  })
                ) : (
                  <NoTask handleOpenModal={handleOpenModal} />
                )}
              </TaskColumn>
            </div>
          )}
        </div>
      </div>
      {/* layout for desktop */}
      <div className="hidden md:block">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 p-4 lg:p-5 gap-4 lg:gap-5 relative z-10 h-[250vh] xl:h-screen">
          {activeTab === "In Progress" && (
            <TaskColumn title="In Progress">
              {tasks && tasks.some((task) => task.status === "in-progress") ? (
                tasks?.map((task) => {
                  if (task.status === "in-progress") {
                    return <InprogressCard key={task._id} task={task} />;
                  }
                })
              ) : (
                <NoTask
                  handleOpenModal={handleOpenModal}
                  status="in-progress"
                />
              )}
            </TaskColumn>
          )}
          <TaskColumn title="Finished">
            {tasks && tasks.some((task) => task.status === "completed") ? (
              tasks?.map((task) => {
                if (task.status === "completed") {
                  return <FinishedCard key={task._id} task={task} />;
                }
              })
            ) : (
              <NoTask status="completed" />
            )}
          </TaskColumn>
          <TaskColumn title="Schedule">
            {tasks && tasks.some((task) => task.status === "scheduled") ? (
              tasks?.map((task) => {
                if (task.status === "scheduled") {
                  return <ScheduleCard key={task._id} task={task} />;
                }
              })
            ) : (
              <NoTask handleOpenModal={handleOpenModal} />
            )}
          </TaskColumn>
        </div>
      </div>
      {isModal && (
        <Modal onClose={handleCloseModal}>
          <AddTask onClose={handleCloseModal} />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Tasks;

const FeedbackProgressCircle = ({percentage}) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={`relative flex items-center justify-center w-[36px] h-[36px]`}
    >
      <svg
        className="transform rotate-[-90deg]"
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
      >
        <circle
          className="text-[#ffffff4f]"
          strokeWidth="15"
          stroke="currentColor"
          fill="transparent"
          r="50"
          cx="60"
          cy="60"
        />
        <circle
          className="text-green-500"
          strokeWidth="15"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="#17a2b8"
          fill="transparent"
          r="50"
          cx="60"
          cy="60"
        />
      </svg>
      <span
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[9px] font-semibold md:font-bold text-[#17a2b8]`}
      >{`${percentage}%`}</span>
    </div>
  );
};
