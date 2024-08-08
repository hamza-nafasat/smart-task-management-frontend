import { useState } from "react";
import Input from "../../components/auth/Input";
import Button from "../../components/shared/button/Button";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { forgetPasswordAction } from "../../redux/actions/usersActions";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!email) return toast.error("Please enter your email address");
    await dispatch(forgetPasswordAction(email));
    setEmail("");
    setIsLoading(false);
  };
  return (
    <div className="p-4 h-screen grid items-center">
      <div className=" p-4 lg:py-6 bg-white rounded-lg">
        <div className="pt-4 lg:w-[50%] mx-auto">
          <h2 className="text-md lg:text-2xl text-center font-semibold">Forget Password</h2>
          <p className="text-sm mt-2 text-center">Please enter your email address to reset your password.</p>
          <form className="w-full mt-4 lg:mt-6 pb-4" onSubmit={submitHandler}>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="mt-6">
              <Button disabled={isLoading} type="submit" text="Reset Password" height='h-[50px]' radius="10px" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
