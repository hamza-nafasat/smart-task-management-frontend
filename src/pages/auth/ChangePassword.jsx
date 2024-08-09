/* eslint-disable react/prop-types */
import { useState } from "react";
import Input from "../../components/auth/Input";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Button from "../../components/shared/button/Button";
import { changePasswordAction, getMyProfileAction } from "../../redux/actions/usersActions";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitLoading, setIsSubmitIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsSubmitIsLoading(true);
      if (newPassword !== confirmPassword) {
        setIsSubmitIsLoading(false);
        return toast.error("Both passwords do not match");
      }
      await dispatch(changePasswordAction(oldPassword, newPassword));
      await dispatch(getMyProfileAction());
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsSubmitIsLoading(false);
      return navigate("/dashboard/profile");
    } catch (error) {
      setIsSubmitIsLoading(false);
    }
  };
  return (
    <div className="p-4 h-screen">
      <div className=" p-4 lg:py-6 bg-[#eef2f56e] rounded-[10px]">
        <div className="pt-4 lg:w-[50%] mx-auto">
          <h2 className="text-md lg:text-xl text-center font-semibold">Change Password</h2>
          <form className="w-full mt-4 lg:mt-6 pb-4" onSubmit={submitHandler}>
            <PasswordInput
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              label="Old Password"
              name="oldPassword"
            />
            <PasswordInput
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              label="New Password"
              name="newPassword"
            />
            <PasswordInput
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm New Password"
              name="confirmNewPassword"
            />
            <div className="mt-6">
              <Button
                isLoading={isSubmitLoading}
                type="submit"
                text="Change Password"
                radius="10px"
                height="h-[50px]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

const PasswordInput = ({ label, name, value, onChange, required = false }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative mt-4 md:mt-6">
      <Input
        value={value}
        onChange={onChange}
        required={required}
        label={label}
        type={isPasswordVisible ? "text" : "password"}
        name={name}
      />
      <div className="absolute right-5 bottom-[20%] cursor-pointer" onClick={togglePasswordVisibility}>
        {isPasswordVisible ? (
          <IoEyeOff style={{ color: "#a6a6a6", width: "25px" }} />
        ) : (
          <IoEye style={{ color: "#a6a6a6", width: "25px" }} />
        )}
      </div>
    </div>
  );
};
