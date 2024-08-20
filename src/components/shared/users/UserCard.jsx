/* eslint-disable react/prop-types */
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import profileImage from "../../../assets/images/profile.png";
import { deleteUserByAdminAction, getAllUsersAction } from "../../../redux/actions/usersActions";
import Button from "../button/Button";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const deleteHandler = (id) => {
    confirmAlert({
      title: "Delete User",
      message: "Are you sure, you want to delete the user?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setLoading(true);
            if (!id) return toast.error("User id not found");
            await dispatch(deleteUserByAdminAction(id));
            await dispatch(getAllUsersAction());
            setLoading(false);
            return navigate("/dashboard/users");
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  return (
    <div className="lg:col-span-6 xl:col-span-4 bg-[#f8f8f8cc] rounded-lg">
      <div className="relative p-4">
        <div className="absolute right-4 top-4">
          <Link title="User Details" to={`/dashboard/single-user/${user?._id}`}>
            <BsFillInfoSquareFill color="#3d3d3d" fontSize={18} />
          </Link>
        </div>
        <div className="absolute -top-[40px] left-1/2 transform -translate-x-1/2">
          <img
            alt="profile pic"
            src={user?.image?.url || profileImage}
            className="w-20 h-20  relative overflow-hidden rounded-full object-cover"
          />
        </div>
        <div className="mt-[2.5rem] flex items-center justify-center gap-1">
          <h3 className="text-base md:text-md text-gray-800 font-medium text-center">{user?.username}</h3>•
        </div>
        <div className="mt-2 flex justify-center items-center gap-1">
          <FaStar fontSize={20} color="#FFA534" />
          <p className="text-xs text-gray-700">(ratings {isNaN(user?.rating) ? 0 : user?.rating})</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm text-gray-500 font-light">Name</p>
            <p className="text-sm md:text-base text-primary">{user?.name}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-500 font-light text-end">Position</p>
            <p className="text-sm md:text-base text-primary text-end">{user?.position}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm text-gray-500 font-light">Email</p>
            <p className="text-sm md:text-sm text-primary">{user?.email}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-500 font-light text-end">In Progress Tasks</p>
            <p className="text-sm md:text-base text-primary text-end">{user?.inProgressTasks}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm text-gray-500 font-light">Completed Tasks</p>
            <p className="text-sm md:text-base text-primary">{user?.completedTasks}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-500 font-light text-end">Scheduled Tasks</p>
            <p className="text-sm md:text-base text-primary text-end">{user?.scheduledTasks}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 mt-3">
          <Link to={`/dashboard/edit-user/${user?._id}`} className="w-full">
            <Button text="Edit" height="h-[40px]" />
          </Link>
          <Button
            disabled={loading}
            click={() => deleteHandler(user?._id)}
            text="Delete"
            height="h-[40px]"
            bg="#9d0707"
          />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
