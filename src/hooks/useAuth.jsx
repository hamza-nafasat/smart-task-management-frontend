import { useSelector } from "react-redux";

const useAuth = () => {
  const { user } = useSelector((state) => state.users);
  if (user && user?.username) {
    return user;
  }

  console.log("users ", user);
  return null;
};

export default useAuth;
