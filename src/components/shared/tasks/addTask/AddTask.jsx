/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import DateIcon from "../../../../assets/svgs/modal/DateIcon";
import { createNewTaskAction, getAllTasksAction } from "../../../../redux/actions/tasksActions";
import FileUpload from "./FileUpload";
import MultiSelectUser from "./MultiSelectUser";

const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AddTask = ({ onClose }) => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.tasks);
  const [isDefault, setIsDefault] = useState(true);
  const [isSchedule, setIsSchedule] = useState(false);
  const [activeWeek, setActiveWeek] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDefaultChange = () => {
    setIsDefault(!isDefault);
    setIsSchedule(isDefault);
  };

  const handleScheduleChange = () => {
    setIsSchedule(!isSchedule);
    setIsDefault(isSchedule);
  };

  const handleWeekClick = (week) => {
    if (isSchedule) setActiveWeek(week);
  };

  const submitTaskHandler = async (e) => {
    e.preventDefault();
    const assigneeIds = selectedUsers.map((user) => user.value);
    setIsLoading(true);
    try {
      if (startDate && endDate && startDate > endDate) {
        setIsLoading(false);
        return toast.error("Start date cannot be greater than end date");
      }
      const formData = new FormData();
      if (title) formData.append("title", title);
      if (description) formData.append("description", description);
      if (startDate && !isSchedule) formData.append("startDate", startDate);
      if (endDate && !isSchedule) formData.append("endDate", endDate);
      if (isSchedule && activeWeek) {
        formData.append("onDay", activeWeek);
        formData.append("status", "scheduled");
      }
      if (selectedUsers.length > 0) formData.append("assignee", assigneeIds.join(","));
      if (selectedFiles.length > 0) {
        console.log("selected Files", selectedFiles);
        selectedFiles.forEach((file, index) => {
          formData.append("files", file, `${file.name}<>${index}`);
        });
      }
      await dispatch(createNewTaskAction(formData));
      await dispatch(getAllTasksAction());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (message) onClose();
  }, [message, dispatch, onClose]);

  return (
    <div className="mt-4 xl:mt-8">
      <form className="w-full" onSubmit={submitTaskHandler}>
        <div>
          <Label title="Title" />
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="rounded-[10px] bg-[#00798c0d] h-[45px] md:h-[54px] focus:outline-none px-4 text-sm text-primary w-full mt-2"
          />
        </div>
        <div className="my-4 xl:my-6">
          <Label title="Description" />
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            cols={5}
            type="text"
            className="rounded-[10px] bg-[#00798c0d] p-4 focus:outline-none text-sm text-primary w-full mt-2"
          />
        </div>

        <div className="my-4 xl:my-6">
          <Label title="Assigned To" />
          <MultiSelectUser selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
        </div>
        <div className="flex items-center justify-between">
          <Label title="Select Date & Time" />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={handleDefaultChange}
                className="border-primary"
                name="default"
              />
              <span className="text-[10px] sm:text-sm md:text-base font-medium text-primary">Default</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={isSchedule} onChange={handleScheduleChange} name="schedule" />
              <span className="text-[10px] sm:text-sm md:text-base font-medium text-primary relative group">
                Schedule
                <span className="absolute left-0 bottom-full mb-2 w-[120px] p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Select this to schedule the task
                </span>
              </span>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-wrap items-center justify-between gap-2 my-4 xl:my-6 ${
            isDefault ? "opacity-100" : "opacity-50 pointer-events-none"
          }`}
        >
          <div className="w-full">
            <div className="flex items-center gap-2">
              <DateIcon />
              <h4 className="text-[10px] sm:text-sm text-[#000000d4] font-medium">Start Date</h4>
            </div>
            <input
              type="datetime-local"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ background: "#00798c0d" }}
              className="w-full h-[50px] rounded-[10px] mt-2 px-2 focus:outline-none"
              disabled={!isDefault}
            />
          </div>
          <div className="w-full">
            <div className="flex items-center gap-2">
              <DateIcon />
              <h4 className="text-[10px] sm:text-sm text-[#000000d4] font-medium">End Date</h4>
            </div>
            <input
              type="datetime-local"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ background: "#00798c0d" }}
              className="w-full h-[50px] rounded-[10px] mt-2 px-2 focus:outline-none"
              disabled={!isDefault}
            />
          </div>
        </div>
        <div
          className={`flex flex-wrap items-center justify-center md:justify-between gap-4 md:gap-2 ${
            isSchedule ? "opacity-100" : "opacity-50 pointer-events-none cursor-not-allowed"
          }`}
        >
          {weeks.map((week) => (
            <div
              key={week}
              onClick={() => handleWeekClick(week)}
              className={`flex items-center justify-center rounded-[3px] w-[40px] h-[65px] md:w-[77px] md:h-[93px] cursor-pointer text-xs sm:text-sm md:text-base ${
                activeWeek === week ? "bg-primary text-white" : "bg-[#17a2b829] text-black"
              }`}
            >
              {week}
            </div>
          ))}
        </div>
        <div className="bg-white my-4 xl:my-6 rounded-lg p-4 xl:p-6">
          <h3 className="text-sm sm:text-base font-semibold text-[#333333]">Add Attachment</h3>
          <FileUpload selectedFile={selectedFiles} setSelectedFile={setSelectedFiles} />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-primary rounded-[10px] disabled:cursor-not-allowed disabled:opacity-50 w-full h-[50px] md:h-[70px] font-medium md:font-semibold text-white text-sm md:text-xl"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;

const Label = ({ title }) => {
  return <label className="text-xs sm:text-sm text-[#00000099] font-medium w-full">{title}</label>;
};
