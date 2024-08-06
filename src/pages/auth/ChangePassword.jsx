import React, { useState } from "react";
import Input from "../../components/auth/Input";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Button from "../../components/shared/button/Button";

const ChangePassword = () => {
  return (
    <div className="p-4 h-screen">
      <div className=" p-4 lg:py-6 bg-[#eef2f56e] rounded-[10px]">
        <div className="pt-4 lg:w-[50%] mx-auto">
          <h2 className="text-md lg:text-xl text-center font-semibold">
            Change Password
          </h2>
          <form className="w-full mt-4 lg:mt-6 pb-4">
            <PasswordInput label="Old Password" name="oldPassword" />
            <PasswordInput label="New Password" name="newPassword" />
            <PasswordInput label="Confirm New Password" name="confirmNewPassword" />
            <div className="mt-6">
                <Button type="submit" text='Change Password' radius="10px" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

const PasswordInput = ({ label, name }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
  
    return (
      <div className="relative mt-4 md:mt-6">
        <Input
          label={label}
          type={isPasswordVisible ? "text" : "password"}
          name={name}
        />
        <div
          className="absolute right-5 bottom-[20%] cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <IoEyeOff style={{ color: "#a6a6a6", width: "25px" }} />
          ) : (
            <IoEye style={{ color: "#a6a6a6", width: "25px" }} />
          )}
        </div>
      </div>
    );
  };
