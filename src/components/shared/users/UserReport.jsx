/* eslint-disable react/prop-types */
import jsPDF from "jspdf";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import CompletedIcon from "../../../assets/svgs/reports/CompletedIcon";
import DetailsIcon from "../../../assets/svgs/reports/DetailsIcon";
import InprogressIcon from "../../../assets/svgs/reports/InprogressIcon";
import ScheduleIcon from "../../../assets/svgs/reports/ScheduleIcon";
import Button from "../../../components/shared/button/Button";
import { isToday } from "../../../utils/features";

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

const UserReport = ({ userDetails }) => {
  console.log(userDetails);
  const downloadPDF = (userDetails) => {
    const doc = new jsPDF();
    let yOffset = 20;

    const pageWidth = doc.internal.pageSize.getWidth();

    const centerText = (text, y) => {
      const textWidth = doc.getTextWidth(text);
      const x = (pageWidth - textWidth) / 2;
      doc.text(text, x, y);
    };
    // Add a title
    doc.setFontSize(20);
    centerText(`${userDetails.name}'s Report`, yOffset);
    yOffset += 10;
    // Add user basic information with better spacing and layout
    doc.setFontSize(12);
    const addUserInfo = () => {
      doc.text(`Name: ${userDetails.name}`, 10, yOffset);
      yOffset += 5;
      doc.text(`Username: ${userDetails.username}`, 10, yOffset);
      yOffset += 5;
      doc.text(`Email: ${userDetails.email}`, 10, yOffset);
      yOffset += 5;
      doc.text(`Position: ${userDetails.position}`, 10, yOffset);
      yOffset += 5;
      doc.text(`Gender: ${userDetails.gender}`, 10, yOffset);
      yOffset += 5;
      doc.text(`Role: ${userDetails.role}`, 10, yOffset);
      yOffset += 5;
      doc.text(`Rating: ${userDetails.rating}`, 10, yOffset);
      yOffset += 10;
    };
    // add chart
    const addChartData = () => {
      doc.setFontSize(20);
      centerText(`${userDetails.name}'s Ratting Data`, yOffset);
      yOffset += 10;
      doc.setFontSize(12);
      doc.text(`Total Rating: ${userDetails.rating}`, 10, yOffset);
      yOffset += 5;
      userDetails.chartData.forEach((data) => {
        doc.text(`${data.label}: ${data.value}`, 10, yOffset);
        yOffset += 5;
      });
      yOffset += 10;
    };
    // add tasks
    const addTasks = () => {
      doc.setFontSize(18);
      centerText(`Tasks Assigned or Created By ${userDetails.name}`, yOffset);
      yOffset += 10;
      doc.setFontSize(12);
      userDetails.tasks.forEach((task, index) => {
        const taskInfo = [
          `${index + 1}. Title: ${task.title}`,
          `   Description: ${task.description}`,
          `   Task Status: ${task.status}`,
          `   Task Creator: ${task.creator}`,
          `   Start Date: ${task.startDate || `Start of ${task.onDay}`}`,
          `   End Date: ${task.endDate || `End of ${task.onDay}`}`,
          `   On Day: ${task.onDay?.toUpperCase()}`,
          `   My Rating: ${task.rattingForMe || 0}`,
          `   Submitted: ${task.isSubmitted ? "Yes" : "No"}`,
          `   Submitted Date: ${task.submittedAt || "N/A"}`,
          `   Completed: ${task.isCompleted ? "Yes" : "No"}`,
          `   Completed Date: ${task.completedAt || "N/A"}`,
          `   Attachments: ${task.attachments?.length || "0"}`,
          `   Comment Count: ${task.commentCount || "0"}`,
          `   Updated At: ${task.updatedAt}`,
          `   Created At: ${task.createdAt}`,
        ].join("\n");
        const splitTaskInfo = doc.splitTextToSize(taskInfo, 180);
        if (yOffset + splitTaskInfo.length * 6 > 280) {
          doc.addPage();
          yOffset = 10;
        }
        doc.text(splitTaskInfo, 10, yOffset);
        yOffset += splitTaskInfo.length * 5 + 5;
      });
    };

    addUserInfo();
    addChartData();
    addTasks();

    doc.save("user-details-report.pdf");
  };

  const rows = userDetails?.tasks;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-[#414141]">Task Report</h2>
        <Button click={() => downloadPDF(userDetails)} text="Export" width="w-24" height="h-[40px]" />
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
