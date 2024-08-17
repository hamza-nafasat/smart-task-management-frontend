import React from "react";
import NoTaskAddIcon from "../../../assets/svgs/tasks/NoTaskAddIcon";
import NoTaskImg from "../../../assets/images/tasks/notask-img.png";

const NoTask = ({ handleOpenModal, status }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <img src={NoTaskImg} alt="image" className="w-[110px]" />
      <h2 className="text-primary text-md md:text-xl font-semibold md:font-bold leading-none">
        No Task
      </h2>
      {status === "completed" ? (
        <p className="text-sm leading-none">Hurry Up!! Finish some tasks.</p>
      ) : (
        <>
          <p className="text-sm leading-none">
            There is no task in{" "}
            {status === "in-progress" ? "progress" : "schedule"}
          </p>
          <button
            onClick={handleOpenModal}
            className="w-[159px] h-[35px] rounded-[7px] bg-primary flex items-center justify-center gap-1 text-white text-sm"
          >
            <NoTaskAddIcon />
            Create New Task
          </button>
        </>
      )}
    </div>
  );
};

export default NoTask;
