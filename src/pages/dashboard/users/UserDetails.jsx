import React from "react";
import dp from "../../../assets/images/profile.png";
import { FaStar } from "react-icons/fa";

const UserDetails = () => {
  return (
    <div className="h-screen p-4">
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
          <UserProfileSection />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

const UserPerformanceSec = () => {

}

const UserProfileSection = ({userImg, ratings, totalRating, user}) => {
  return (
    <div className="bg-white p-4 rounded-lg flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <img
          src={dp}
          alt="profile"
          className="w-[160px] h-[160px] rounded-full object-cover border-2 border-[#17a2b8]"
        />
        <div className="flex items-center gap-1">
          <FaStar color="#c8a21a" fontSize={24} />
          <FaStar color="#c8a21a" fontSize={24} />
          <FaStar color="#c8a21a" fontSize={24} />
          <FaStar color="#c8a21a" fontSize={24} />
          <FaStar color="#00000073" fontSize={24} />
        </div>
        <p className="text-sm font-bold text-[#242222cc]">214 Rates</p>
      </div>
      <div className="flex-1">
        <table className="w-full">
          <tbody>
            <tr className="flex items-center justify-between gap-4">
              <td className="basis-[40%]">
                <p className="text-sm text-[#41414199]">Name:</p>
              </td>
              <td className="basis-[60%]">
                <p className="text-sm font-semibold text-[#242222cc]">
                  Zain
                </p>
              </td>
            </tr>
            <tr className="flex items-center justify-between gap-4">
              <td className="basis-[40%]">
                <p className="text-sm text-[#41414199]">Username:</p>
              </td>
              <td className="basis-[60%]">
                <p className="text-sm font-semibold text-[#242222cc]">
                Zain@645
                </p>
              </td>
            </tr>
            <tr className="flex items-center justify-between gap-4">
              <td className="basis-[40%]">
                <p className="text-sm text-[#41414199]">Gender:</p>
              </td>
              <td className="basis-[60%]">
                <p className="text-sm font-semibold text-[#242222cc]">
                Male
                </p>
              </td>
            </tr>
            <tr className="flex items-center justify-between gap-4">
              <td className="basis-[40%]">
                <p className="text-sm text-[#41414199]">Email:</p>
              </td>
              <td className="basis-[60%]">
                <p className="text-sm font-semibold text-[#242222cc]">
                zain1215@gmail.com
                </p>
              </td>
            </tr>
            <tr className="flex items-center justify-between gap-4">
              <td className="basis-[40%]">
                <p className="text-sm text-[#41414199]">Position:</p>
              </td>
              <td className="basis-[60%]">
                <p className="text-sm font-semibold text-[#242222cc]">
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
