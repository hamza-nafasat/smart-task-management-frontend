import { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { logoutAction } from "../../../redux/actions/usersActions";
import Button from "../../shared/button/Button";
import { IoIosArrowBack, IoIosLogOut } from "react-icons/io";
import DashboardIcon from "../../../assets/svgs/aside/DashboardIcon";
import NotificationsIcon from "../../../assets/svgs/aside/NotificationsIcon";
import ProfileIcon from "../../../assets/svgs/aside/ProfileIcon";
import ReportsIcon from "../../../assets/svgs/aside/ReportsIcon";
import UsersIcon from "../../../assets/svgs/aside/UsersIcon";

const Aside = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error, user } = useSelector((state) => state.users);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const location = useLocation();
  const locationSplit = location.pathname.split("/");
  const url = locationSplit[locationSplit.length - 1];
  console.log(url)
  
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
  
  let pages = [
    {
      title: "dashboard",
      link: "/dashboard",
      icon: <DashboardIcon activeLink={url === 'dashboard'} />,
    },
    {
      title: "notifications",
      link: "/dashboard/notifications",
      icon: <NotificationsIcon activeLink={url === 'notifications'} />,
    },
    {
      title: "profile",
      link: "/dashboard/profile",
      icon: <ProfileIcon activeLink={url === 'profile'} />,
    },
    {
      title: "reports",
      link: "/dashboard/reports",
      icon: <ReportsIcon activeLink={url === 'reports'} />,
    },
    {
      title: "users",
      link: "/dashboard/users",
      icon: <UsersIcon activeLink={url === 'users'} />,
    },
  ];
  // conditionally change user
  if (user.role !== "admin") {
    pages = pages.map((page) => page.title !== "users" && { ...page });
  }
  
  return (
    <div
      className={`p-4 rounded-t-md h-[calc(100vh-0px)] relative flex flex-col justify-between transition-all duration-500 ${
        isNavOpen ? "w-[200px]" : "w-[55px]"
      }`}
    >
      <div className="absolute right-[5px] cursor-pointer" onClick={handleNavOpen}>
        <div
          className={`hidden md:block transition-all duration-500 ${isNavOpen ? "rotate-180" : "rotate-0"}`}
        >
          <IoIosArrowBack color="#ffffff" fontSize={20} />
        </div>
      </div>
      <div className="mt-8 md:mt-12">
        <div className="w-full mb-5 xl:mb-12 flex flex-col items-center justify-center gap-1">
          <img src={logo} alt="logo" className="w-16" />
          <p
            className={`text-white font-medium text-base md:text-md transition-all duration-500 ${
              isNavOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Smart Tasks
          </p>
        </div>
        <div className={`flex flex-col justify-center gap-2 ${isNavOpen ? "items-start" : "items-center"}`}>
          {pages.map((page, i) => (
            <Link
              key={i}
              to={page.link}
              className={`flex items-center w-full min-w-fit p-2 cursor-pointer transition-all duration-400 ${
                isNavOpen ? "gap-2" : "gap-[0]"
              } ${page.title === url ? "bg-white rounded-md" : ""}`}
            >
              <div className={`text-[20px] ${page.title === url ? "text-primary" : "text-white"}`}>
                {page.icon}
              </div>
              <p
                className={`navbar-title text-sm md:text-base capitalize transition-opacity duration-500 ${
                  page.title === url ? "text-primary" : "text-white"
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
          height={isNavOpen ? "h-[30px] md:h-[50px]" : "md:h-[40px] h-[30px]"}
        />
      </div>
    </div>
  );
};

export default Aside;
