import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CompletedIcon from "../../../assets/svgs/reports/CompletedIcon.jsx";
import DetailsIcon from "../../../assets/svgs/reports/DetailsIcon";
import InprogressIcon from "../../../assets/svgs/reports/InprogressIcon.jsx";
import ScheduleIcon from "../../../assets/svgs/reports/ScheduleIcon.jsx";
import Button from "../../../components/shared/button/Button.jsx";
import { getFilteredTasksAction } from "../../../redux/actions/tasksActions.js";
import { getStatusColor, isToday } from "../../../utils/features.js";

const columns = [
  {
    name: "Creator",
    selector: (row) => row?.creatorName,
    width: "12%",
  },
  {
    name: "Title",
    selector: (row) => row.title,
    width: "18%",
  },
  {
    name: "Date",
    width: "18%",
    cell: (row) => (
      <div className="flex items-center gap-1">
        <div>
          {row?.status === "completed" ? (
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
    width: "14%",
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
    name: "Assignees",
    cell: (row) => <div>{row?.assignee?.length || 0}</div>,
    width: "12%",
  },
  {
    name: "Attachments",
    cell: (row) => <div>{row?.attachments?.length || 0}</div>,
    width: "12%",
  },
  {
    name: "Details",
    cell: (row) => (
      <Link to={`/dashboard/tasks/${row._id}`} className="cursor-pointer">
        <DetailsIcon />
      </Link>
    ),
    width: "13%",
  },
];

const Reports = () => {
  const dispatch = useDispatch();
  const { filteredTasks } = useSelector((state) => state.tasks);
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);
  const [rows, setRows] = useState([]);

  const downloadPDF = async (data) => {
    const doc = new jsPDF();
    let yOffset = 15;

    // Centered Text Function
    const centerText = (text, y, fontSize = 16, color = [0, 0, 0]) => {
      doc.setFontSize(fontSize);
      doc.setTextColor(...color);
      const textWidth = doc.getTextWidth(text);
      const x = (doc.internal.pageSize.getWidth() - textWidth) / 2;
      doc.text(text, x, y);
    };

    // Add Date and Time in Upper Left Corner
    const addDateAndTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      doc.setFontSize(8); // Smaller font size
      doc.setTextColor(150, 150, 150); // Light gray color for the date and time
      doc.text(`Generated on: ${formattedDate} ${formattedTime}`, 8, 5);
    };

    // Add Task Table with Heading
    const addTaskTable = () => {
      const taskData = data.map((task, index) => [
        index + 1,
        task.creator?.name,
        task.title.toUpperCase(),
        {
          content: task.status,
          styles: {
            fillColor: getStatusColor(task.status),
            textColor: [255, 255, 255],
            halign: "center",
            valign: "middle",
          },
        },
        task.startDate?.split("T")?.[0]?.split("-")?.reverse()?.join("/") ||
          `Start of ${isToday(task.onDay, true)}`,
        task.endDate?.split("T")?.[0]?.split("-")?.reverse()?.join("/") ||
          `End of ${isToday(task.onDay, true)}`,
        task.assignee?.length || 0,
      ]);

      // Add Table Heading
      centerText("Tasks Report", yOffset, 18, [63, 81, 181]);
      yOffset += 10;

      // Add Task Table
      doc.autoTable({
        head: [["#", "User", "Task", "Status", "Start Date", "End Date", "Assignees"]],
        body: taskData,
        startY: yOffset,
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 10,
          cellPadding: 4,
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        headStyles: {
          fillColor: [33, 150, 243],
          textColor: [255, 255, 255],
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
      });
    };
    addDateAndTime();
    addTaskTable();

    // Save the PDF
    doc.save("tasks-report.pdf");
  };

  useEffect(() => {
    dispatch(
      getFilteredTasksAction({
        creatorName: filterName,
        status: filterStatus,
        startDate: filterStartDate,
        endDate: filterEndDate,
      })
    );
  }, [filterStartDate, filterEndDate, dispatch, filterStatus, filterName]);

  useEffect(() => {
    if (filteredTasks) setRows(filteredTasks);
  }, [filteredTasks]);

  return (
    <div className="h-screen p-4">
      <div className="bg-[#fff] backdrop-blur-lg rounded-lg">
        <div className="flex items-center justify-between gap-4 p-4 relative z-50 ">
          <h2 className="text-base font-medium text-[#414141] text-nowrap">Task Report</h2>
          <Button click={() => downloadPDF(filteredTasks)} text="Export" width="w-24" height="h-[40px]" />
        </div>
        <div className="flex items-center flex-wrap gap-4 p-4">
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
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="scheduled">Schedule</option>
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
        <div className="mt-4 report-table">
          <DataTable
            columns={columns}
            data={rows}
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
