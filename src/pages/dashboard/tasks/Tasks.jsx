import React, { useEffect, useState } from "react";
import Modal from "../../../components/shared/modal/Modal";
import AddTask from "../../../components/shared/tasks/addTask/AddTask";
import FinishedCard from "../../../components/shared/tasks/FinishedCard";
import InprogressCard from "../../../components/shared/tasks/InprogressCard";
import ScheduleCard from "../../../components/shared/tasks/ScheduleCard";
import TaskColumn from "../../../components/shared/tasks/TaskColumn";
import Button from "../../../components/shared/button/Button";

const Tasks = () => {
  const [isModal, setIsModal] = useState(false);
  const [activeTab, setActiveTab] = useState("In Progress");

  const tabHandler = (tab) => {
    setActiveTab(tab);
    console.log("tab", tab);
  };

  const handleOpenModal = () => {
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };

  return (
    <React.Fragment>
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
                <InprogressCard />
                <InprogressCard />
                <InprogressCard />
                <InprogressCard />
              </TaskColumn>
            </div>
          )}
          {activeTab === "Finished" && (
            <div className="animate-slideUp">
              <TaskColumn title="Finished">
                <FinishedCard />
                <FinishedCard />
                <FinishedCard />
              </TaskColumn>
            </div>
          )}
          {activeTab === "Scheduled" && (
            <div className="animate-slideUp">
              <TaskColumn title="Schedule">
                <ScheduleCard />
                <ScheduleCard />
              </TaskColumn>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:block">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 p-4 lg:p-5 gap-4 lg:gap-5 relative z-10 h-[250vh] xl:h-screen">
          <TaskColumn click={handleOpenModal} title="In Progress">
            <InprogressCard />
            <InprogressCard />
            <InprogressCard />
            <InprogressCard />
          </TaskColumn>
          <TaskColumn title="Finished">
            <FinishedCard />
            <FinishedCard />
            <FinishedCard />
          </TaskColumn>
          <TaskColumn title="Schedule">
            <ScheduleCard />
            <ScheduleCard />
          </TaskColumn>
        </div>
      </div>
      {isModal && (
        <Modal onClose={handleCloseModal}>
          <AddTask />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Tasks;
