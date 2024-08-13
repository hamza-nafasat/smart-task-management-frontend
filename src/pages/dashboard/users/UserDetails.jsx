import React from "react";
import dp from "../../../assets/images/profile.png";
import { FaStar } from "react-icons/fa";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import UserReport from "../../../components/shared/users/UserReport";

const tasksData = [
  { label: "Completed", value: 30 },
  { label: "In Progress", value: 15 },
  { label: "Schedule", value: 13 },
  { label: "In Progress but Overdue", value: 19 },
];


const UserDetails = () => {
  return (
    <div className="h-fullp-4">
      <div className="p-4 rounded-lg bg-[#eef2f56e]">
        <div className="flex items-center gap-4">
          <h2 className="text-base font-medium text-[#414141] text-nowrap">
            User Report
          </h2>
          <div className="h-[1px] bg-[#0000005c] w-full"></div>
          <select className="text-[#7e7e7e] text-xs py-2 px-3 bg-white focus:outline-none border border-[#0000000f] rounded-full cursor-pointer">
            <option className="text-[#7e7e7e] text-xs" disabled selected>
              Week {""}
              <span className="text-[#414141] font-semibold">Week</span>
            </option>
            <option className="py-2 px-3" value="sort-by-user">
              Month
            </option>
            <option className="py-2 px-3" value="sort-by-date">
              Year
            </option>
          </select>
        </div>
        <div className="mt-4 grid lg:grid-cols-2 gap-4">
          <UserProfileSection userImg={dp} totalRating={23} />
          <UserPerformanceSec />
        </div>
        <div className="mt-4 bg-white rounded-lg p-4">
          <UserReport />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

const UserPerformanceSec = () => {
  return (
    <div className="bg-white rounded-lg p-4">
      <p className="text-base font-semibold text-[#414141]">Performance:</p>
      <div className="flex flex-col sm:flex-row items-center gap-12 sm:gap-4 justify-center mt-5">
        <div className="w-full md:px-8">
          <RatingList
            ratingName={"Excellent"}
            ratings={23}
            ratingEmoji={"😊"}
          />
          <RatingList ratingName={"Good"} ratings={11} ratingEmoji={" 🙂 "} />
          <RatingList
            ratingName={"Average"}
            ratings={29}
            ratingEmoji={" 😐 "}
          />
          <RatingList ratingName={"Bad"} ratings={9} ratingEmoji={" 😶 "} />
        </div>
        <div className="w-full md:px-8 flex justify-center">
          <PerformancePieChart data={tasksData} />
        </div>
      </div>
    </div>
  );
};

const RatingList = ({ ratingName, ratings, ratingEmoji }) => {
  return (
    <div className="flex items-center gap-4">
      <p className="text-sm sm:text-base font-medium sm:font-semibold text-[#41414199] basis-[50%]">
        {ratingName}:
      </p>
      <p className="flex items-center gap-1 text-sm sm:text-base font-medium sm:font-semibold text-[#414141] basis-[48%]">
        <p className="text-2xl">{ratingEmoji}</p>
        {ratings}
      </p>
    </div>
  );
};

const UserProfileSection = ({ userImg, ratings, totalRating, user }) => {
  return (
    <div className="bg-white p-4 rounded-lg flex flex-col sm:flex-row items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <img
          src={userImg}
          alt="profile"
          className="w-20 h-20 md:w-[160px] md:h-[160px] rounded-full object-cover border-2 border-[#17a2b8]"
        />
        <div className="flex items-center gap-1">
          <FaStar color="#c8a21a" fontSize={24} />
          <FaStar color="#c8a21a" fontSize={24} />
          <FaStar color="#c8a21a" fontSize={24} />
          <FaStar color="#c8a21a" fontSize={24} />
          <FaStar color="#00000073" fontSize={24} />
        </div>
        <p className="text-sm font-bold text-[#242222cc]">
          {totalRating} Rates
        </p>
      </div>
      <div className="flex-1 w-full">
        <table className="w-full">
          <tbody>
            <tr className="flex items-center justify-between gap-4">
              <td className="basis-[40%]">
                <p className="text-xs sm:text-sm text-[#41414199]">Name:</p>
              </td>
              <td className="basis-[60%]">
                <p className="text-xs sm:text-sm font-medium sm:font-semibold text-[#242222cc]">Zain</p>
              </td>
            </tr>
            <tr className="flex items-center justify-between gap-4">
              <td className="basis-[40%]">
                <p className="text-xs sm:text-sm text-[#41414199]">Username:</p>
              </td>
              <td className="basis-[60%]">
                <p className="text-xs sm:text-sm font-medium sm:font-semibold text-[#242222cc]">
                  Zain@645
                </p>
              </td>
            </tr>
            <tr className="flex items-center justify-between gap-4">
              <td className="basis-[40%]">
                <p className="text-xs sm:text-sm text-[#41414199]">Gender:</p>
              </td>
              <td className="basis-[60%]">
                <p className="text-xs sm:text-sm font-medium sm:font-semibold text-[#242222cc]">Male</p>
              </td>
            </tr>
            <tr className="flex items-center justify-between gap-4">
              <td className="basis-[40%]">
                <p className="text-xs sm:text-sm text-[#41414199]">Email:</p>
              </td>
              <td className="basis-[60%]">
                <p className="text-xs sm:text-sm font-medium sm:font-semibold text-[#242222cc]">
                  zain1215@gmail.com
                </p>
              </td>
            </tr>
            <tr className="flex items-center justify-between gap-4">
              <td className="basis-[40%]">
                <p className="text-xs sm:text-sm text-[#41414199]">Position:</p>
              </td>
              <td className="basis-[60%]">
                <p className="text-xs sm:text-sm font-medium sm:font-semibold text-[#242222cc]">
                  UI/UX Designer
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PerformancePieChart = ({ data }) => {
  const colors = [
    "#9eff00", // Completed
    "#ff8900", // In Progress
    "#7b90ff", // Schedule
    "#ff3e00", // In Progress but Overdue
  ];

  const chartData = data.map((item, index) => ({
    name: item.label,
    value: item.value,
    color: colors[index],
  }));

  return (
    <div className="relative w-[200px] h-[200px] mt-[-1.2rem]">
      <PieChart width={200} height={200}>
        <Pie
          data={chartData}
          startAngle={90}
          endAngle={-270}
          innerRadius={70}
          outerRadius={100}
          cornerRadius={10}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`url(#gradient-${index})`}
              stroke="none"
            />
          ))}
        </Pie>
        {chartData.map((entry, index) => (
          <defs key={`gradient-${index}`}>
            <linearGradient
              id={`gradient-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={entry.color} stopOpacity={0.7} />
              <stop offset="100%" stopColor={entry.color} stopOpacity={1} />
            </linearGradient>
          </defs>
        ))}
        <Tooltip />
      </PieChart>
      <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl md:text-[42px] font-semibold text-[#17a2b8]">
        {data.reduce((acc, item) => acc + item.value, 0)}%
      </p>
    </div>
  );
};

