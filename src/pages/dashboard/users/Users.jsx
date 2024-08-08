import { useEffect } from "react";
import { RiAddBoxFill } from "react-icons/ri";
import UserCard from "../../../components/shared/users/UserCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../../redux/actions/usersActions";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);
  return (
    <div className="md:h-screen p-4">
      <div className="bg-[#eef2f56e] rounded-[10px] h-full p-4 overflow-y-scroll scrollbar-0">
        <div className="flex justify-end">
          <Link to="/dashboard/add-user" className="p-1 bg-primary rounded-lg">
            <RiAddBoxFill color="#fff" fontSize={18} cursor="pointer" />
          </Link>
        </div>
        <div className="mt-[5rem] grid lg:grid-cols-12 gap-4" style={{ rowGap: "4rem" }}>
          {users?.map((user) => (
            <UserCard key={user?._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
