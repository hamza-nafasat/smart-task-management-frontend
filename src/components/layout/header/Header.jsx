import { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom";
import Profile from "../../../assets/images/profile.png";
import { BiSolidUpArrow } from "react-icons/bi";
import NotificationInner from "../../../pages/dashboard/notifications/modal/NotificationInner";
import Button from "../../../components/shared/button/Button";
import { faceExpressions } from "../../../data/data";
import { useSelector } from "react-redux";

const Header = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.users);

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

    document.body.addEventListener("click", (e) => {
      setIsNotificationOpen(false);
    });

    return () => clearInterval(timeInterval);
  });

  return (
    <>
      <div className="h-[80px] flex items-center justify-between px-4">
        <div className="flex flex-col">
          <p className="text-xs text-white">{dateString}</p>
          <p className="text-base text-white">{timeString}</p>
        </div>
        <h3 className="text-white text-lg md:text-3xl font-bold">Hey, John Doe!</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute top-[-2px] right-[-3px] bg-red-700 w-3 h-3 rounded-full flex items-center justify-center text-[10px] font-semibold text-white">
              4
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
            <img src={profileUrl || Profile} alt="" className="w-[40px] h-[40px] rounded-full object-cover" />
          </Link>
        </div>
      </div>
      {isModalOpen && <FeedbackModal onclose={handleCloseModal} />}
    </>
  );
};

export default Header;

const FeedbackModal = ({ onclose }) => {
  const [selectedExpression, setSelectedExpression] = useState(null);
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm drop-shadow-2xl w-full py-4 flex items-center justify-center z-[999] transition-all duration-500"
      onClick={onclose}
    >
      <div
        className="p-4 bg-white rounded-md w-[220px] md:w-[400px] overflow-y-scroll scrollbar-0"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-center">Leave a Feedback</h3>
        <div className="my-4 flex items-center justify-between gap-2 px-4">
          {faceExpressions.map((expression) => (
            <button
              key={expression.label}
              onClick={() => setSelectedExpression(expression.icon)}
              className="text-[2.5rem] hover:scale-[1.3] transition-all duration-300"
            >
              {expression.icon}
            </button>
          ))}
        </div>
        {selectedExpression && (
          <div className="my-2 text-sm text-gray-600">
            You selected: <span className="text-lg">{selectedExpression}</span>
          </div>
        )}
        <Button text="Submit" height="40px" />
      </div>
    </div>
  );
};
