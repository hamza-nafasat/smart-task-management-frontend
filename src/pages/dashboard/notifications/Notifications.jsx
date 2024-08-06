import React from "react";
import { notificationsRows } from "../../../data/data";

const headRows = [
  {
    accessorKey: "notificationType",
    header: "Notification Type",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
];

const Notifications = () => {
  return (
    <div className="h-[calc(100vh-0px)] p-4">
      <div className="bg-[#eef2f56e] rounded-[10px] h-full">
        <table className="w-full">
          <thead>
            <tr className="bg-white">
              {headRows.map((td, i) => (
                <td
                  key={i}
                  className="font-medium text-[#2a2a2a] border-b border-[#00000011] text-base p-4"
                >
                  {td.header}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {notificationsRows.map((row, i) => (
              <tr
                className={`text-[#2a2a2a] ${
                  i % 2 == 0 ? "bg-[#ffffff4f]" : ""
                }`}
              >
                <td className="p-4 border-b border-[#00000011] text-sm">
                  {row.notificationType}
                </td>
                <td className="p-4 border-b border-[#00000011] text-sm">
                  {row.message}
                </td>
                <td className="p-4 border-b border-[#00000011] text-sm">
                  {row.time}
                </td>
                <td className="p-4 border-b border-[#00000011] text-sm">
                  {row.url}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;
