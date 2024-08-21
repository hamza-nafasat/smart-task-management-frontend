/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Profile from "../../../assets/images/profile.png";
import NotificationInner from "../../../pages/dashboard/notifications/modal/NotificationInner";
import FeedbackModal from "../../shared/feedbackModal/FeedbackModal";

const Header = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.users);
  const { unreadNotifications } = useSelector((state) => state.notifications);

  // constants
  // ---------
  const profileUrl = user?.image?.url;

  // handlers
  // --------
  const handleOpenModal = (type) => {
    if (type === "feedback") setIsModalOpen(!isModalOpen);
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const handleNotificationOpen = (e) => {
    e.stopPropagation();

    setIsNotificationOpen(!isNotificationOpen);
  };

  const formatDateTime = (date) => {
    const optionsDate = { day: "numeric", month: "short", year: "numeric" };
    const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };
    const dateString = date.toLocaleString("en-US", optionsDate).replace(/,/g, "");
    const timeString = date.toLocaleString("en-US", optionsTime).replace("/^0/", "");
    return { dateString, timeString };
  };
  const { dateString, timeString } = formatDateTime(dateTime);

  // useEffects
  // ----------
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setDateTime(new Date());
    }, 5000);

    document.body.addEventListener("click", () => {
      setIsNotificationOpen(false);
    });

    return () => clearInterval(timeInterval);
  });

  return (
    <>
      <div
        className={`pt-6 md:pt-0 h-[80px] flex items-center justify-between px-4 transition-all duration-400 ${
          isNotificationOpen ? "z-[999]" : "z-0"
        }`}
      >
        <div className="flex flex-col">
          <p className="text-[11px] md:text-base text-white">{timeString}</p>
          <p className="text-[8px] md:text-xs text-white">{dateString}</p>
        </div>
        <h3 className="text-white text-md md:text-lg lg:text-2xl font-medium md:font-semibold flex">
          Hey<span className="hidden sm:block">🖐</span> {user.name}!
        </h3>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative">
            <div className="absolute top-[-2px] right-[-3px] bg-red-700 w-3 h-3 rounded-full flex items-center justify-center text-[10px] font-semibold text-white">
              {unreadNotifications?.length || 0}
            </div>
            <IoNotifications cursor="pointer" fontSize={20} color="#fff" onClick={handleNotificationOpen} />
            <div
              className={`absolute top-[160%] right-[-35%] bg-white rounded-lg drop-shadow-md w-[250px] transition-all duration-400 ${
                isNotificationOpen ? "opacity-100 z-[999]" : "opacity-0"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <NotificationInner openModal={handleOpenModal} />
              <div className="absolute top-[-4%] right-[3.5%]">
                <BiSolidUpArrow color="#fff" />
              </div>
            </div>
          </div>
          <Link to="profile">
            <img
              src={profileUrl || Profile}
              alt=""
              className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
      {isModalOpen && <FeedbackModal onclose={handleCloseModal} />}
    </>
  );
};

export default Header;
