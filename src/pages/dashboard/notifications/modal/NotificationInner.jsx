/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTimeAgo } from "../../../../utils/formatting";

const NotificationSlider = ({ openModal, handleNotificationOpen }) => {
  const { unreadNotifications } = useSelector((state) => state.notifications);

  return (
    <Fragment>
      <div className="bg-white rounded-[4px] px-4 pt-4 h-[300px] overflow-y-scroll notification-scroll">
        <h4 className="font-semibold text-sm text-[#333333]">Notifications</h4>
        <div className="mt-3 flex flex-col gap-2">
          {unreadNotifications?.map((comment, i) => (
            <div className="flex gap-2 cursor-pointer" key={i} onClick={() => openModal(comment.type)}>
              <img
                src={comment?.from?.image?.url}
                className="w-7 h-7 rounded-full object-cover flex items-center justify-center text-[10px] font-semibold"
              />
              <div className="flex flex-col">
                <p className="text-[10px] text-[#333333]">
                  <span className="font-semibold">{comment?.title}</span> {comment.description}
                </p>
                <span className="text-[8px] text-[#8a3a3a]">{getTimeAgo(comment?.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
        <div onClick={handleNotificationOpen}>
          <Link
            className="block mt-3 py-2 w-full backdrop-blur-sm font-medium text-center text-sm sticky bottom-0 left-0 text-primary"
            to="notifications"
          >
            See all Notifications
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default NotificationSlider;
