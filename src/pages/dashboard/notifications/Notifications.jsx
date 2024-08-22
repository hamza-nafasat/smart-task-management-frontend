/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { MdOutlineTaskAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotificationAction,
  getAllNotificationsAction,
  getUnreadNotificationsAction,
  readAllNotificationsAction,
} from "../../../redux/actions/notificationsAction";
import { getTimeAgo } from "../../../utils/formatting";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";

const Notifications = () => {
  const dispatch = useDispatch();
  const { unreadNotifications, allNotifications } = useSelector((state) => state.notifications);
  const [allNotificationsData, setAllNotificationsData] = useState([]);

  useEffect(() => {
    (async () => {
      await dispatch(readAllNotificationsAction());
      await dispatch(getUnreadNotificationsAction());
      await dispatch(getAllNotificationsAction());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (allNotifications) {
      setAllNotificationsData(allNotifications);
    }
  }, [allNotifications]);
  return (
    <div className="md:h-[calc(100vh-0px)] p-4 ">
      <div className="bg-[#eef2f56e] rounded-[10px] h-full p-4 overflow-y-auto notification-scroll">
        <h2 className="text-md lg:text-xl font-semibold border-b border-[#00000010] pb-2">
          Notifications List
        </h2>
        <div className="mt-2">
          {allNotificationsData?.map((notification) => (
            <NotificationList key={notification._id} notification={notification} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;

const NotificationList = ({ notification }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const deleteNotificationHandler = () => {
    confirmAlert({
      title: "Delete User",
      message: "Are you sure, you want to delete the user?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setLoading(true);
            await dispatch(deleteNotificationAction(notification._id));
            await dispatch(getAllNotificationsAction());
            setLoading(false);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="flex items-center justify-between border-b border-[#00000010] py-2">
      <div className="flex items-center gap-2">
        <img src={notification?.from?.image?.url} className="bg-[#eef2f56e] h-10 w-10 rounded-full"></img>
        <div>
          <p className="text-sm">{notification?.description}</p>
          <p className="text-[10px] text-gray-600">{getTimeAgo(notification?.createdAt)}</p>
        </div>
      </div>
      <div
        onClick={!loading ? deleteNotificationHandler : () => {}}
        className={`${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <MdCancel fontSize={22} color="#a30000" opacity={loading ? 0.5 : 1} />
      </div>
    </div>
  );
};
