import React from "react";

const columns = [
  {
    title: "user",
    selector: (row) => row.title,
  },
];

const Reports = () => {
  return (
    <div className="h-screen p-4">
      <div className="bg-[#fff] backdrop-blur-lg rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium text-[#414141]">Task Report</h2>
          <div className="flex items-center gap-4">
            <input
              type="search"
              className="py-2 px-3 text-xs focus:outline-none bg-transparent border border-[#0000000f] rounded-full"
              placeholder="Search report"
            />
            <select className="text-[#7e7e7e] text-xs py-2 px-3 bg-transparent focus:outline-none border border-[#0000000f] rounded-full cursor-pointer">
              <option className="text-[#7e7e7e] text-xs" disabled selected>
                Sort by: {''}
                <span className="text-[#414141] font-semibold">Newest</span>
              </option>
              <option className="py-2 px-3" value="sort-by-user">Sort by user</option>
              <option className="py-2 px-3" value="sort-by-date">Sort by date</option>
              <option className="py-2 px-3" value="sort-by-status">Sort by status</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Reports;
