/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import dp from "../../../assets/images/profile.png";
import UserReport from "../../../components/shared/users/UserReport";
import { getSingleUserExtraDetails } from "../../../redux/actions/usersActions";
import html2canvas from "html2canvas";
import profileImage from "../../../assets/images/profile.png";

const UserDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [userDetailsData, setUserDetailsData] = useState();
  const { userDetails } = useSelector((state) => state.users);
  const [UserPerformance, setUserPerformance] = useState([
    { ratingName: "Excellent", ratings: 0, ratingEmoji: "😊" },
    { ratingName: "Good", ratings: 0, ratingEmoji: "🙂" },
    { ratingName: "Average", ratings: 0, ratingEmoji: "😐" },
    { ratingName: "Bad", ratings: 0, ratingEmoji: "😶" },
    { ratingName: "Very Bad", ratings: 0, ratingEmoji: "🙁" },
  ]);

  const captureAndReturnImage = async () => {
    const userPerformanceElement = document.getElementById("userPerformanceSection");
    const userPerformanceCanvas = await html2canvas(userPerformanceElement, { windowWidth: 1300 });
    return userPerformanceCanvas;
  };

  useEffect(() => {
    if (params.userId) {
      dispatch(getSingleUserExtraDetails(params?.userId, userDetailsData));
    }
  }, [dispatch, params.userId, userDetailsData]);

  // find data for user efficiency
  useEffect(() => {
    if (userDetails) {
      let excellentPerformances = 0;
      let goodPerformances = 0;
      let averagePerformances = 0;
      let badPerformances = 0;
      let veryBadPerformances = 0;

      if (userDetails?.rattingArrays?.length > 0) {
        userDetails?.rattingArrays?.forEach((rating) => {
          console.log("rating", rating);
          if (rating[0] == 1) {
            veryBadPerformances = rating?.length || 0;
          }
          if (rating[0] == 2) {
            badPerformances = rating?.length || 0;
          }
          if (rating[0] == 3) {
            averagePerformances = rating?.length || 0;
          }
          if (rating[0] == 4) {
            goodPerformances = rating?.length || 0;
          }
          if (rating[0] == 5) {
            excellentPerformances = rating?.length || 0;
          }
        });

        setUserPerformance([
          { ratingName: "Excellent", ratings: excellentPerformances, ratingEmoji: "😊" },
          { ratingName: "Good", ratings: goodPerformances, ratingEmoji: "🙂" },
          { ratingName: "Average", ratings: averagePerformances, ratingEmoji: "😐" },
          { ratingName: "Bad", ratings: badPerformances, ratingEmoji: "😶" },
          { ratingName: "Very Bad", ratings: veryBadPerformances, ratingEmoji: "🙁" },
        ]);
      }
    }
  }, [userDetails]);

  return (
    <div className="h-full p-4">
      <div className="p-4 rounded-lg bg-[#eef2f56e]">
        <div className="flex items-center gap-4">
          <h2 className="text-base font-medium text-[#414141] text-nowrap">User Report</h2>
          <div className="h-[1px] bg-[#0000005c] w-full"></div>
          <select
            onChange={(e) => setUserDetailsData(e.target.value)}
            className="text-[#7e7e7e] text-xs py-2 px-3 bg-white focus:outline-none border border-[#0000000f] rounded-full cursor-pointer"
          >
            <option className="py-2 px-3" value="">
              Default
            </option>
            <option className="text-xs" value="week">
              Week
            </option>
            <option className="py-2 px-3" value="month">
              Month
            </option>
            <option className="py-2 px-3" value="year">
              Year
            </option>
          </select>
        </div>
        <div id="mainDivForPic" className="mt-4 grid lg:grid-cols-2 gap-4 ">
          <div id="userProfileSection">
            <UserProfileSection user={userDetails} userImg={dp} />
          </div>
          <div className="" id="userPerformanceSection">
            <UserPerformanceSec
              UserPerformance={UserPerformance}
              chartData={userDetails?.chartData}
              ratingPercent={userDetails?.ratingEfficiency}
            />
          </div>
        </div>
        <div className="mt-4 bg-white rounded-lg p-4">
          <UserReport captureAndReturnImage={captureAndReturnImage} userDetails={userDetails} />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

const UserPerformanceSec = ({ UserPerformance, chartData, ratingPercent }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <p className="text-base font-semibold text-[#414141]">Performance:</p>
      <div className="flex flex-col sm:flex-row items-center gap-12 sm:gap-4 justify-center mt-5">
        <div className="w-full md:px-8">
          {UserPerformance?.map(({ ratingName, ratings, ratingEmoji }, i) => (
            <RatingList key={i} ratingName={ratingName} ratings={ratings} ratingEmoji={ratingEmoji} />
          ))}
        </div>
        <div className="w-full md:px-8 flex justify-center">
          <PerformancePieChart data={chartData} ratingPercent={ratingPercent} />
        </div>
      </div>
    </div>
  );
};

const RatingList = ({ ratingName, ratings, ratingEmoji }) => {
  return (
    <div className="flex items-center gap-4">
      <p className="text-sm sm:text-base font-medium sm:font-semibold text-[#41414199] basis-[80%]">
        {ratingName}:
      </p>
      <p className="flex items-center gap-1 text-sm sm:text-base font-medium sm:font-semibold text-[#414141] basis-[48%]">
        <p className="text-2xl">{ratingEmoji}</p>
        {ratings}
      </p>
    </div>
  );
};

const UserProfileSection = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded-lg flex flex-col sm:flex-row items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <img
          src={user?.image?.url || profileImage}
          alt="profile"
          className="w-20 h-20 md:w-[160px] md:h-[160px] rounded-full object-cover border-2 border-[#17a2b8]"
        />
        <div className="flex items-center gap-1">
          <UserRatingStarList rating={user?.rating} />
        </div>
        <p className="text-sm font-bold text-[#242222cc]">Rating: {user?.rating}</p>
      </div>
      <div className="flex-1 w-full">
        <table className="w-full">
          <tbody className="w-full flex flex-col gap-2">
            <tr className="flex items-center justify-between gap-4">
              <td className="basis-[40%]">
                <p className="text-xs sm:text-sm text-[#41414199]">Name:</p>
              </td>
              <td className="basis-[60%]">
                <p className="text-xs sm:text-sm font-medium sm:font-semibold text-[#242222cc]">
                  {user?.name}
                </p>
              </td>
            </tr>
            <tr className="flex items-center justify-between gap-4">
              <td className="basis-[40%]">
                <p className="text-xs sm:text-sm text-[#41414199]">Username:</p>
              </td>
              <td className="basis-[60%]">
                <p className="text-xs sm:text-sm font-medium sm:font-semibold text-[#242222cc]">
                  {user?.username}
                </p>
              </td>
            </tr>
            <tr className="flex items-center justify-between gap-4">
              <td className="basis-[40%]">
                <p className="text-xs sm:text-sm text-[#41414199]">Email:</p>
              </td>
              <td className="basis-[60%]">
                <p className="text-xs sm:text-sm font-medium sm:font-semibold text-[#242222cc]">
                  {user?.email}
                </p>
              </td>
            </tr>
            <tr className="flex items-center justify-between gap-4">
              <td className="basis-[40%]">
                <p className="text-xs sm:text-sm text-[#41414199]">Position:</p>
              </td>
              <td className="basis-[60%]">
                <p className="text-xs sm:text-sm font-medium sm:font-semibold text-[#242222cc]">
                  {user?.position}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PerformancePieChart = ({ data, ratingPercent }) => {
  const colors = ["#9eff00", "#ff8900", "#7b90ff"];
  const chartData = data?.map((item, index) => ({
    name: item.label,
    value: 1,
    actualValue: item?.value,
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
          {chartData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} stroke="none" />
          ))}
        </Pie>
        {chartData?.map((entry, index) => (
          <defs key={`gradient-${index}`}>
            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={entry?.color} stopOpacity={0.7} />
              <stop offset="100%" stopColor={entry?.color} stopOpacity={1} />
            </linearGradient>
          </defs>
        ))}
        <Tooltip
          wrapperStyle={{ zIndex: 10 }}
          formatter={(value, name, props) => `${props?.payload?.actualValue}`}
        />
      </PieChart>
      <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl md:text-[42px] font-semibold text-[#17a2b8] z-[1]">
        {ratingPercent}%
      </p>
    </div>
  );
};

const UserRatingStarList = ({ rating }) => {
  const getStarClass = (starIndex) => {
    if (rating >= starIndex) {
      return "text-yellow-500";
    } else if (rating >= starIndex - 0.5) {
      return "text-yellow-300";
    } else {
      return "text-gray-400";
    }
  };

  return (
    <div className="flex flex-row-reverse justify-center rating">
      {[5, 4, 3, 2, 1].map((starIndex) => (
        <React.Fragment key={starIndex}>
          <input
            value={starIndex}
            name="rate"
            id={`star${starIndex}`}
            type="radio"
            className="hidden"
            checked={Math.floor(rating) === starIndex}
            readOnly
          />
          <label
            htmlFor={`star${starIndex}`}
            className={`cursor-pointer text-2xl transition duration-200 ease-in-out ${getStarClass(
              starIndex
            )}`}
          >
            ★
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};
