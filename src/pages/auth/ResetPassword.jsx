import { useState } from "react";
import Input from "../../components/auth/Input";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Button from "../../components/shared/button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetPasswordAction } from "../../redux/actions/usersActions";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const resetToken = location.pathname?.split("/").slice(-1)[0];
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const submitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (newPassword != confirmNewPassword) return toast.error("Both passwords do not match");
    await dispatch(resetPasswordAction(newPassword, resetToken));
    setNewPassword("");
    setConfirmNewPassword("");
    navigate("/login");
    setIsLoading(false);
  };
  return (
    <div className="p-4 h-screen grid items-center">
      <div className=" p-4 lg:py-6 bg-white rounded-lg">
        <div className="pt-4 lg:w-[50%] mx-auto">
          <h2 className="text-md lg:text-2xl text-center font-semibold">Reset Password</h2>
          <p className="text-sm mt-2 text-center">Please create a new password for your account.</p>
          <form className="w-full mt-4 lg:mt-6 pb-4" onSubmit={submitHandler}>
            <PasswordInput
              label="New Password"
              name="newPassword"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <PasswordInput
              label="Confirm New Password"
              name="confirmNewPassword"
              required
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <div className="mt-6">
              <Button disabled={isLoading} type="submit" text="Reset Password" radius="10px" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

const PasswordInput = ({ ...rest }) => {
  const { label, name, required, value, onChange } = rest;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative mt-4 md:mt-6">
      <Input
        label={label}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        type={isPasswordVisible ? "text" : "password"}
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
