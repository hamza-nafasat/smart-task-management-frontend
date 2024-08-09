/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../components/auth/Input";
import Button from "../../components/shared/button/Button";
import { changePasswordAction, firstLoginAction, getMyProfileAction } from "../../redux/actions/usersActions";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitLoading, setIsSubmitIsLoading] = useState(false);
  const [skipIsLoading, setSkipIsLoading] = useState(false);
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
      return navigate("/dashboard");
    } catch (error) {
      setIsSubmitIsLoading(false);
    }
  };

  const skipClickHandler = async () => {
    setSkipIsLoading(true);
    try {
      await dispatch(firstLoginAction());
      await dispatch(getMyProfileAction());
      setSkipIsLoading(false);
      return navigate("/dashboard");
    } catch (error) {
      setSkipIsLoading(false);
    }
  };
  return (
    <div className="p-2 h-screen">
      <div className=" p-2 pb-10 lg:py-6 bg-[#eef2f56e] rounded-[10px]">
        <div className="pt-2 lg:w-[50%] mx-auto">
          <h2 className="text-md lg:text-xl text-center font-semibold">
            Change Password on Your First Login
          </h2>
          <form className="w-full mt-3 lg:mt-4 pb-2" onSubmit={submitHandler}>
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
                disabled={isSubmitLoading}
                type="submit"
                text="Change Password"
                radius="10px"
                height="h-[60px]"
              />
            </div>
          </form>
          <div className="mt-2 underline">
            <Button
              disabled={skipIsLoading}
              click={skipClickHandler}
              text="Skip This Step"
              radius="10px"
              height="h-[45px]"
              bg="transparent"
              color="#000000"
            />
          </div>
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
    <div className="relative mt-2 md:mt-2">
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
