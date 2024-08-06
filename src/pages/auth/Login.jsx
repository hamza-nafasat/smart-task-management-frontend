import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import loginImg from "../../assets/images/login-img.png";
import Input from "../../components/auth/Input";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/shared/button/Button";
import { loginAction } from "../../redux/actions/usersActions";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearUserError } from "../../redux/slices/usersSlices";

const Login = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsActive, setPasswordIsActive] = useState(true);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // handlers
  // --------
  const handlePasswordActive = () => setPasswordIsActive(!passwordIsActive);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoginLoading(true);
      if (!email || !password) return toast.error("Please Enter Your Email and Password");
      await dispatch(loginAction(email, password));
      setIsLoginLoading(false);
    } catch (error) {
      setIsLoginLoading(false);
    }
  };

  // use effects
  // -----------

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUserError());
    }
    if (message) {
      return navigate("/dashboard");
    }
  }, [error, message, dispatch, navigate]);

  return (
    <section className="w-full h-[100vh] grid md:grid-cols-2">
      <div className="bg-[#17A2B8] py-[24px] lg:py-[90px] 2xl:py-[100px] hidden md:flex flex-col items-center justify-center">
        <div className="px-[24px]">
          <div className="flex items-center justify-start md:gap-4">
            <img src={logo} alt="logo" className="w-[60px] md:w-[90px]" />
            <h2 className="text-lg md:text-[24px] font-semibold text-white">Smart Tasks</h2>
          </div>
          <h1 className="my-4 text-white font-semibold text-2xl md:text3xl lg:text-[40px] leading-none lg:leading-[50px] text-center md:text-left">
            Welcome to Smart <br />
            Tasks!
          </h1>
          <p className="text-white text-base md:text-[24px] text-center md:text-left">Login your account</p>
        </div>
        <div className="mt-12">
          <img src={loginImg} alt="login image" className="max-w-[100%] w-[600px]" />
        </div>
      </div>
      <div className="bg-white relative my-[24px] lg:my-[90px] 2xl:my-[100px]">
        <div className="w-full bg-white md:shadow-form-shadow rounded-[20px] px-4 py-8 md:px-[60px] md:absolute md:left-[-5%] md:top-[50%] md:translate-x-[-5%] md:translate-y-[-50%] flex flex-col">
          <h3 className="text-3xl text-center md:text-left md:text-[30px] text-[#414141] font-semibold">
            Welcome to Smart Tasks!
          </h3>
          <form className="mt-4 md:mt-[50px] w-full" onSubmit={submitHandler}>
            <Input
              label="Email Address"
              type="email"
              id="email"
              name={"email"}
              value={email}
              change={(e) => setEmail(e.target.value)}
              placeholder={"Enter Email Address"}
            />
            <div className="relative mt-4 md:mt-6">
              <Input
                label="Password"
                type={passwordIsActive ? "password" : "text"}
                id="password"
                name={"password"}
                value={password}
                change={(e) => setPassword(e.target.value)}
                placeholder={"Enter Password"}
              />
              <div className="absolute right-5 bottom-[20%] cursor-pointer" onClick={handlePasswordActive}>
                {passwordIsActive ? (
                  <IoEye style={{ color: "#a6a6a6", width: "25px" }} />
                ) : (
                  <IoEyeOff style={{ color: "#a6a6a6", width: "25px" }} />
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4 mb-4 md:mb-[30px]">
              <Link to="/forget-password">
                <p className="text-sm text-[#676767]">Forget Password?</p>
              </Link>
            </div>
            <Button
              disabled={isLoginLoading}
              type="submit"
              text="Login"
              radius="14px"
              size="20px"
              weight="500"
            />
          </form>
          <div className="mt-4 md:mt-[50px] flex justify-end items-end grow">
            <img src={logo} alt="img" className="max-w-[100%] w-[200px] opacity-25" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
