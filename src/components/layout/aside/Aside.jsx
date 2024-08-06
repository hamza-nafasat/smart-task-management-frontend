import React, { useEffect, useState } from "react";
import { GrTask } from "react-icons/gr";
import { IoIosArrowBack, IoIosLogOut } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbUserCheck } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { logoutAction } from "../../../redux/actions/usersActions";
import Button from "../../shared/button/Button";

const pages = [
  {
    title: "dashboard",
    link: "/dashboard",
    icon: <GrTask />,
  },
  {
    title: "notifications",
    link: "/dashboard/notifications",
    icon: <IoNotificationsOutline />,
  },
  {
    title: "profile",
    link: "/dashboard/profile",
    icon: <TbUserCheck />,
  },
  {
    title: "users",
    link: "/dashboard/users",
    icon: <TbUserCheck />,
  },
];

const Aside = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error } = useSelector((state) => state.users);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const location = useLocation();
  const locationSplit = location.pathname.split("/");
  const url = locationSplit[locationSplit.length - 1];

  const handleNavOpen = () => setIsNavOpen(!isNavOpen);

  const logoutHandler = async () => {
    setIsLogoutLoading(true);
    await dispatch(logoutAction());
    setIsLogoutLoading(false);
  };

  useEffect(() => {
    if (message) {
      return navigate("/login");
    }
  }, [dispatch, message, navigate]);

  return (
    <div
      className={`p-4 rounded-t-md h-[calc(100vh-0px)] relative flex flex-col justify-between transition-all duration-500 ${
        isNavOpen ? "w-[200px]" : "w-[55px]"
      }`}
    >
      <div className="absolute right-[5px] cursor-pointer" onClick={handleNavOpen}>
        <div className={`transition-all duration-500 ${isNavOpen ? "rotate-180" : "rotate-0"}`}>
          <IoIosArrowBack color="#ffffff" fontSize={20} />
        </div>
      </div>
      <div className="mt-8 md:mt-12">
        <div className="w-full mb-5 xl:mb-12 flex flex-col items-center justify-center gap-1">
          <img src={logo} alt="logo" className="w-16" />
          <p
            className={`text-white font-medium text-md transition-all duration-500 ${
              isNavOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Smart Tasks
          </p>
        </div>
        <div
          className={`flex flex-col justify-center gap-4 md:gap-5 ${
            isNavOpen ? "items-start" : "items-center"
          }`}
        >
          {pages.map((page, i) => (
            <Link key={i} to={page.link} className="flex items-center gap-2 w-full">
              <div className="text-[20px]" style={{ color: page.title === url ? "#ffffff" : "#000000" }}>
                {page.icon}
              </div>
              <p
                className={`navbar-title text-base capitalize transition-opacity duration-500 ${
                  page.title === url ? "text-[#ffffff]" : "text-[#000000]"
                } ${isNavOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
              >
                {page.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-6 md:mt-12 mb-4">
        <Button
          disabled={isLogoutLoading}
          click={logoutHandler}
          text={isNavOpen ? "Logout" : <IoIosLogOut fontSize={20} />}
          height={isNavOpen ? "50px" : "40px"}
        />
      </div>
    </div>
  );
};

export default Aside;