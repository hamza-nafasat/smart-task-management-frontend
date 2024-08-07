import { IoStar } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { MdOutlineTaskAlt } from "react-icons/md";

const Notifications = () => {
  return (
    <div className="h-[calc(100vh-0px)] p-4">
      <div className="bg-[#eef2f56e] rounded-[10px] h-full p-4">
        <h2 className="text-md lg:text-xl font-semibold border-b border-[#00000010] pb-2">
          Notifications List
        </h2>
        <div className="mt-2">
          <NotificationList iconType='comment' />
          <NotificationList iconType='task' />
          <NotificationList iconType='comment' />
          <NotificationList iconType='task' />
          <NotificationList iconType='comment' />
          <NotificationList iconType='task' />
          <NotificationList iconType='comment' />
          <NotificationList iconType='task' />
        </div>
      </div>
    </div>
  );
};

export default Notifications;

const NotificationList = ({ icon, comment, date, iconType }) => {
  return (
    <div className="flex items-center justify-between border-b border-[#00000010] py-2">
      <div className="flex items-center gap-2">
        <div className="bg-[#eef2f56e] rounded-full p-1">
          {iconType === 'comment' ? (
            <IoStar color="orangered" fontSize={20} />
          ):(
            <MdOutlineTaskAlt color="green" fontSize={20} />
          )}
        </div>
        <div>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            ullam ea aliquam architecto facilis laboriosam debitis dicta rerum
            accusantium nesciunt.
          </p>
          <p className="text-[10px] text-gray-600">Mar 15</p>
        </div>
      </div>
      <div className="cursor-pointer">
        <MdCancel fontSize={22} color="#a30000" />
      </div>
    </div>
  );
};
