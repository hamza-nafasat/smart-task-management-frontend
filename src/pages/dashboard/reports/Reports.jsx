import React, { useState } from "react";
import DataTable from "react-data-table-component";
import DetailsIcon from "../../../assets/svgs/reports/DetailsIcon";
import CompletedIcon from "../../../assets/svgs/reports/CompletedIcon.jsx";
import InprogressIcon from "../../../assets/svgs/reports/InprogressIcon.jsx";
import ScheduleIcon from "../../../assets/svgs/reports/ScheduleIcon.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
          <p className="text-[12px] font-semibold text-[#17a2b8]">
            {row.startDate}
          </p>
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
  {
    id: 6,
    user: "Sophia Brown",
    task: "Graphic Design",
    startDate: "20-Apr-2024",
    endDate: "30-Apr-2024",
    status: "Completed",
    feedback: 5,
    details: "",
  },
  {
    id: 7,
    user: "James White",
    task: "App Development",
    startDate: "05-Sep-2024",
    endDate: "25-Sep-2024",
    status: "In Progress",
    feedback: 4,
    details: "",
  },
  {
    id: 8,
    user: "Olivia Martinez",
    task: "Market Research",
    startDate: "15-Mar-2024",
    endDate: "25-Mar-2024",
    status: "Completed",
    feedback: 5,
    details: "",
  },
  {
    id: 9,
    user: "Liam Harris",
    task: "Brand Strategy",
    startDate: "10-Oct-2024",
    endDate: "20-Oct-2024",
    status: "Schedule",
    feedback: 4,
    details: "",
  },
  {
    id: 10,
    user: "Emma Clark",
    task: "SEO Audit",
    startDate: "02-Nov-2024",
    endDate: "12-Nov-2024",
    status: "Schedule",
    feedback: 5,
    details: "",
  },
  {
    id: 11,
    user: "Noah King",
    task: "Video Production",
    startDate: "20-Dec-2024",
    endDate: "30-Dec-2024",
    status: "Schedule",
    feedback: 3,
    details: "",
  },
];

const Reports = () => {
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);

  const filteredRows = rows.filter((row) => {
    const isNameMatch = row.user
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const isStatusMatch = filterStatus ? row.status === filterStatus : true;
    const isStartDateMatch = filterStartDate
      ? new Date(row.startDate) >= new Date(filterStartDate)
      : true;
    const isEndDateMatch = filterEndDate
      ? new Date(row.endDate) <= new Date(filterEndDate)
      : true;
    return isNameMatch && isStatusMatch && isStartDateMatch && isEndDateMatch;
  });

  return (
    <div className="h-screen p-4">
      <div className="bg-[#fff] backdrop-blur-lg rounded-lg">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 relative z-50">
          <h2 className="text-base font-medium text-[#414141] text-nowrap">Task Report</h2>
          <div className="flex items-center flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search by name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="border p-2 rounded-lg focus:outline-none text-sm text-[#101010]"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border p-2 rounded-lg focus:outline-none text-sm text-[#101010]"
            >
              <option value="">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Schedule">Schedule</option>
            </select>
            <DatePicker
              selected={filterStartDate}
              onChange={(date) => setFilterStartDate(date)}
              placeholderText="Start Date"
              className="border p-2 rounded-lg focus:outline-none text-sm text-[#101010]"
            />
            <DatePicker
              selected={filterEndDate}
              onChange={(date) => setFilterEndDate(date)}
              placeholderText="End Date"
              className="border p-2 rounded-lg focus:outline-none text-sm text-[#101010]"
            />
          </div>
        </div>
        <div className="mt-4 report-table">
          <DataTable
            columns={columns}
            data={filteredRows}
            customStyles={customStyles}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="80vh"
          />
        </div>
      </div>
    </div>
  );
};

export default Reports;

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
