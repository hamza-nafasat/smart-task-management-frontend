import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Aside from "../../components/layout/aside/Aside";
import Header from "../../components/layout/header/Header";
import Main from "../../components/layout/main/Main";

const Dashboard = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const mobileNavHandler = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };
  return (
    <section className="w-full user-dashboard relative h-[calc(100vh-0px)] overflow-x-hidden overflow-y-scroll bg-[#f5f7fb] z-0 scrollbar-0">
      <div className="flex flex-col-2">
        <div
          onClick={mobileNavHandler}
          className={`block md:hidden fixed h-full z-[999] transition-all duration-300 ${
            isMobileNavOpen ? "bg-[#000000b7] inset-0" : ""
          }`}
        >
          <div
            onClick={mobileNavHandler}
            className={`cursor-pointer absolute z-[999999] p-1 bg-[#eef2f5a5] backdrop-blur-lg ${
              isMobileNavOpen
                ? "rotate-0 rounded-r-md"
                : "rotate-180 rounded-l-md"
            }`}
          >
            <IoIosArrowBack fontSize={18} color="#00000099" />
            {isMobileNavOpen && <Aside />}
          </div>
        </div>
        <div className="bg-linearGrad backdrop-blur-lg hidden md:block">
          <Aside />
        </div>
        <div className="w-[100%]">
          <Header />
          <Main />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
