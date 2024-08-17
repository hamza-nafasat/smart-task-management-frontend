/* eslint-disable react/prop-types */
import DataTable from "react-data-table-component";
import DetailsIcon from "../../../assets/svgs/reports/DetailsIcon";
import ScheduleIcon from "../../../assets/svgs/reports/ScheduleIcon";
import InprogressIcon from "../../../assets/svgs/reports/InprogressIcon";
import CompletedIcon from "../../../assets/svgs/reports/CompletedIcon";
import Button from "../../../components/shared/button/Button";
import { isToday } from "../../../utils/features";
import { Link } from "react-router-dom";

const columns = [
  {
    name: "User",
    selector: (row) => row?.creator,
    width: "12%",
  },
  {
    name: "Task",
    selector: (row) => row?.title?.toUpperCase(),
    width: "15%",
  },
  {
    name: "Date",
    width: "24%",
    cell: (row) => (
      <div className="flex items-center gap-1">
        <div>
          {row.status === "completed" ? (
            <CompletedIcon />
          ) : row.status === "in-progress" ? (
            <InprogressIcon />
          ) : (
            <ScheduleIcon />
          )}
        </div>
        <div className="flex flex-col">
          {row.status !== "scheduled" ? (
            <>
              <p className="text-[12px] font-semibold text-[#17a2b8]">{row.startDate}</p>
              <p
                className={`text-[12px] font-semibold ${
                  row.status === "completed"
                    ? "text-[#87d10f]"
                    : row.status === "in-progress"
                    ? "text-[#fb9e32]"
                    : row.status === "scheduled"
                    ? "text-[#92a3ff]"
                    : "text-[#eb4e1c]"
                }`}
              >
                {row.endDate}
              </p>
            </>
          ) : (
            <>
              {" "}
              <p className="text-[12px] font-semibold text-[#17a2b8]">From day start to end</p>
              <p
                className={`text-[12px] font-semibold ${
                  row.status === "completed"
                    ? "text-[#87d10f]"
                    : row.status === "in-progress"
                    ? "text-[#fb9e32]"
                    : row.status === "scheduled"
                    ? "text-[#92a3ff]"
                    : "text-[#eb4e1c]"
                }`}
              >
                of every {isToday(row.onDay, true)?.toUpperCase()}
              </p>
            </>
          )}
        </div>
      </div>
    ),
  },
  {
    name: "Status",
    width: "21%",
    cell: (row) =>
      row.status === "completed" ? (
        <p className="bg-[#87d10f] rounded-[12px] text-white text-sm font-medium p-2 w-[110px] text-center">
          {row.status}
        </p>
      ) : row.status === "in-progress" ? (
        <p className="bg-[#fb9e32] rounded-[12px] text-white text-sm font-medium p-2 w-[110px] text-center">
          {row.status}
        </p>
      ) : (
        <p className="bg-[#92a3ff] rounded-[12px] text-white text-sm font-medium p-2 w-[110px] text-center">
          {row.status}
        </p>
      ),
  },
  {
    name: "Feedback",
    width: "15%",
    cell: (row) =>
      Number(row?.rattingForMe) == 5 ? (
        <div className="flex items-center flex-col w-14">
          <p className="text-[20px]">😊</p>
          <p className="text-xs text-[#292d32cc] font-medium">Excellent</p>
        </div>
      ) : Number(row?.rattingForMe) == 4 ? (
        <div className="flex items-center flex-col w-14">
          <p className="text-[20px]">🙂</p>
          <p className="text-xs text-[#292d32cc] font-medium">Good</p>
        </div>
      ) : Number(row?.rattingForMe == 3) ? (
        <div className="flex items-center flex-col w-14">
          <p className="text-[20px]">😐</p>
          <p className="text-xs text-[#292d32cc] font-medium">Average</p>
        </div>
      ) : Number(row?.rattingForMe == 2) ? (
        <div className="flex items-center flex-col w-14">
          <p className="text-[20px]">😶</p>
          <p className="text-xs text-[#292d32cc] font-medium">Bad</p>
        </div>
      ) : Number(row?.rattingForMe == 1) ? (
        <div className="flex items-center flex-col w-14">
          <p className="text-[20px]">🙁</p>
          <p className="text-xs text-[#292d32cc] font-medium">Very Bad</p>
        </div>
      ) : (
        <div className="flex items-center flex-col w-14">
          <p className="text-xs text-[#292d32cc] font-medium">{row.rattingForMe}</p>
        </div>
      ),
  },
  {
    name: "Details",
    width: "13%",
    cell: (row) => (
      <Link to={`/dashboard/tasks/${row._id}`} className="cursor-pointer">
        <DetailsIcon />
      </Link>
    ),
  },
];

const UserReport = ({ tasks }) => {
  const rows = tasks;
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
