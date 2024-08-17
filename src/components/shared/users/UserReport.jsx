import React from "react";
import DataTable from "react-data-table-component";
import DetailsIcon from "../../../assets/svgs/reports/DetailsIcon";
import ScheduleIcon from "../../../assets/svgs/reports/ScheduleIcon";
import InprogressIcon from "../../../assets/svgs/reports/InprogressIcon";
import CompletedIcon from "../../../assets/svgs/reports/CompletedIcon";
import Button from "../../../components/shared/button/Button";

const columns = [
  {
    name: "User",
    selector: (row) => row.user,
    width: "12%",
  },
  {
    name: "Task",
    selector: (row) => row.task,
    width: "15%",
  },
  {
    name: "Date",
    width: "24%",
    cell: (row) => (
      <div className="flex items-center gap-1">
        <div>
          {row.status === "Completed" ? (
            <CompletedIcon />
          ) : row.status === "In Progress" ? (
            <InprogressIcon />
          ) : (
            <ScheduleIcon />
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-[12px] font-semibold text-[#17a2b8]">{row.startDate}</p>
          <p
            className={`text-[12px] font-semibold ${
              row.status === "Completed"
                ? "text-[#87d10f]"
                : row.status === "In Progress"
                ? "text-[#fb9e32]"
                : row.status === "Schedule"
                ? "text-[#92a3ff]"
                : "text-[#eb4e1c]"
            }`}
          >
            {row.endDate}
          </p>
        </div>
      </div>
    ),
  },
  {
    name: "Status",
    width: "21%",
    cell: (row) =>
      row.status === "Completed" ? (
        <p className="bg-[#87d10f] rounded-[12px] text-white text-sm font-medium p-2 w-[99px] text-center">
          {row.status}
        </p>
      ) : row.status === "In Progress" ? (
        <p className="bg-[#fb9e32] rounded-[12px] text-white text-sm font-medium p-2 w-[99px] text-center">
          {row.status}
        </p>
      ) : (
        <p className="bg-[#92a3ff] rounded-[12px] text-white text-sm font-medium p-2 w-[99px] text-center text-white">
          {row.status}
        </p>
      ),
  },
  {
    name: "Feedback",
    width: "15%",
    cell: (row) =>
      row.feedback === 5 ? (
        <div className="flex items-center flex-col w-14">
          <p className="text-[20px]">😊</p>
          <p className="text-xs text-[#292d32cc] font-medium">Excellent</p>
        </div>
      ) : row.feedback === 4 ? (
        <div className="flex items-center flex-col w-14">
          <p className="text-[20px]">🙂</p>
          <p className="text-xs text-[#292d32cc] font-medium">Good</p>
        </div>
      ) : row.feedback === 3 ? (
        <div className="flex items-center flex-col w-14">
          <p className="text-[20px]">😐</p>
          <p className="text-xs text-[#292d32cc] font-medium">Average</p>
        </div>
      ) : row.feedback === 2 ? (
        <div className="flex items-center flex-col w-14">
          <p className="text-[20px]">😶</p>
          <p className="text-xs text-[#292d32cc] font-medium">Bad</p>
        </div>
      ) : (
        <div className="flex items-center flex-col w-14">
          <p className="text-[20px]">🙁</p>
          <p className="text-xs text-[#292d32cc] font-medium">Very Bad</p>
        </div>
      ),
  },
  {
    name: "Details",
    selector: () => (
      <div className="cursor-pointer">
        <DetailsIcon />
      </div>
    ),
    width: "13%",
  },
];

const rows = [
  {
    id: 1,
    user: "John Smith",
    task: "Website Seo",
    startDate: "02-Aug-2024",
    endDate: "22-Aug-2024",
    status: "Completed",
    feedback: 5,
    details: "",
  },
  {
    id: 2,
    user: "Jane Doe",
    task: "Social Media Campaign",
    startDate: "01-Jul-2024",
    endDate: "15-Jul-2024",
    status: "In Progress",
    feedback: 4,
    details: "",
  },
  {
    id: 3,
    user: "Michael Johnson",
    task: "Email Marketing",
    startDate: "10-Jun-2024",
    endDate: "20-Jun-2024",
    status: "Completed",
    feedback: 5,
    details: "",
  },
  {
    id: 4,
    user: "Emily Davis",
    task: "Content Creation",
    startDate: "12-May-2024",
    endDate: "30-May-2024",
    status: "Completed",
    feedback: 4,
    details: "",
  },
  {
    id: 5,
    user: "David Wilson",
    task: "PPC Advertising",
    startDate: "01-Aug-2024",
    endDate: "15-Aug-2024",
    status: "In Progress",
    feedback: 3,
    details: "",
  },
];

const UserReport = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-[#414141]">Task Report</h2>
        <Button text="Export" width="w-24" height="h-[40px]" />
      </div>
      <div className="mt-5">
        <DataTable
          columns={columns}
          data={rows}
          customStyles={customStyles}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="30%"
        />
      </div>
    </div>
  );
};

export default UserReport;

const customStyles = {
  headCells: {
    style: {
      color: "rgba(132, 133, 139, 1)",
      fontSize: "16px",
      fontWeight: 600,
    },
  },
  cells: {
    color: "rgba(41, 45, 50, 0.8)",
    fontSize: "14px",
  },
  rows: {
    style: {
      padding: "6dpx 0",
    },
  },
  pagination: {
    style: {
      borderRadius: "12px",
    },
  },
};
