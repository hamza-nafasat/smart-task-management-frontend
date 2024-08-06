import React, { useState } from "react";
import TaskColumn from "../../../components/shared/tasks/TaskColumn";
import TaskCard from "../../../components/shared/tasks/TaskCard";
import Modal from "../../../components/shared/modal/Modal";
import AddTask from "../../../components/shared/tasks/addTask/AddTask";
import InprogressCard from "../../../components/shared/tasks/InprogressCard";
import FinishedCard from "../../../components/shared/tasks/FinishedCard";
import ScheduleCard from "../../../components/shared/tasks/ScheduleCard";

const Tasks = () => {
  const [isModal, setIsModal] = useState(false);

  const handleOpenModal = () => {
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };
  return (
    <>
      <div className="grid lg:grid-cols-3 p-4 md:p-5 gap-4 md:gap-5 relative z-10 h-screen">
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
      {isModal && (
        <Modal onClose={handleCloseModal}>
          <AddTask />
        </Modal>
      )}
    </>
  );
};

export default Tasks;
