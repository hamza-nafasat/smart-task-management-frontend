/* eslint-disable react/prop-types */
import jsPDF from "jspdf";
import "jspdf-autotable";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import CompletedIcon from "../../../assets/svgs/reports/CompletedIcon";
import DetailsIcon from "../../../assets/svgs/reports/DetailsIcon";
import InprogressIcon from "../../../assets/svgs/reports/InprogressIcon";
import ScheduleIcon from "../../../assets/svgs/reports/ScheduleIcon";
import Button from "../../../components/shared/button/Button";
import { getRatingEmoji, getStatusColor, isToday } from "../../../utils/features";
import profileImage from "../../../assets/images/profile.png";

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

const UserReport = ({ userDetails, captureAndReturnImage }) => {
  const downloadPDF = async (userDetails) => {
    // Capture the chart image
    const chartSectionImage = await captureAndReturnImage();
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const columnWidth = (pageWidth - 30) / 2; // Reduced the gap between sections
    let yOffset = 15;

    // Centered Text Function
    const centerText = (text, y, fontSize = 16, color = [0, 0, 0]) => {
      doc.setFontSize(fontSize);
      doc.setTextColor(...color);
      const textWidth = doc.getTextWidth(text);
      const x = (pageWidth - textWidth) / 2;
      doc.text(text, x, y);
    };

    // Add Report Title at the Top
    centerText(`${userDetails.name}'s Report`, yOffset, 24, [33, 150, 243]);
    yOffset += 15;

    const sectionHeight = 45; // Set a consistent height for both sections

    // Draw a rectangle around the user details and profile image
    doc.setDrawColor(63, 81, 181);
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(10, yOffset, columnWidth, sectionHeight, 5, 5, "FD");

    // Add User Profile Image
    const imageXOffset = 15;
    const imageWidth = 20;
    const imageHeight = 20;
    doc.addImage(
      userDetails?.image?.url || profileImage,
      "PNG",
      imageXOffset,
      yOffset + (sectionHeight - imageHeight) / 2, // Vertically centered
      imageWidth,
      imageHeight
    );

    // Add User Details next to the Image
    const textXOffset = imageXOffset + imageWidth + 5;
    doc.setFontSize(10);
    doc.setTextColor(33, 33, 33);
    doc.text(`Name: ${userDetails.name}`, textXOffset, yOffset + 10);
    doc.text(`Position: ${userDetails.position}`, textXOffset, yOffset + 20);
    doc.text(`Email: ${userDetails.email}`, textXOffset, yOffset + 30);
    doc.text(`Rating: ${userDetails.rating}`, textXOffset, yOffset + 40);

    // Draw a rectangle around the chart and position it next to the user details
    doc.setDrawColor(63, 81, 181);
    doc.roundedRect(columnWidth + 20, yOffset, columnWidth, sectionHeight, 5, 5, "S");

    // Add Chart Image
    doc.addImage(
      chartSectionImage,
      "PNG",
      columnWidth + 25, // Adjusted to be closer to the user details section
      yOffset + (sectionHeight - 40) / 2, // Vertically centered
      columnWidth - 10,
      40
    );

    // Adjust yOffset for the next section
    yOffset += sectionHeight + 10;

    // Add Task Table with Heading
    const addTaskTable = () => {
      const taskData = userDetails.tasks.map((task, index) => [
        index + 1,
        task.creator,
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
        task.startDate?.split("T")?.[0]?.split("-")?.reverse()?.join("/") || `Start of ${task.onDay}`,
        task.endDate?.split("T")?.[0]?.split("-")?.reverse()?.join("/") || `End of ${task.onDay}`,
        getRatingEmoji(task.rattingForMe || 0),
      ]);

      // Add Table Heading
      yOffset += 10;
      centerText("Reports Table", yOffset, 18, [63, 81, 181]);
      yOffset += 10;

      doc.autoTable({
        head: [["#", "User", "Task", "Status", "Start Date", "End Date", "Feedback"]],
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

    addTaskTable();

    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);

    doc.save("user-details-report.pdf");
  };

  // // Add chart
  // const addChartData = () => {
  //   doc.addImage(userDetails.chartImage, "PNG", 10, yOffset, 90, 50);
  //   yOffset += 60;
  // };
  // addChartData();

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
