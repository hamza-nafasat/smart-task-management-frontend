/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import profileImg from "../../../assets/images/tasks/dp.png";
import Input from "../../../components/auth/Input";
import Button from "../../../components/shared/button/Button";
import {
  editUserByAdminAction,
  getAllUsersAction,
  getSingleUserByAdminAction,
} from "../../../redux/actions/usersActions";

const EditUser = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { singleUser } = useSelector((state) => state.users);
  const [imgSrc, setImgSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [formFields, setFormFields] = useState({
    name: "",
    userName: "",
    email: "",
    position: "",
    gender: "",
    role: "",
  });

  const handleFormFields = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("hello");

    const formData = new FormData();
    if (formFields.userName !== singleUser?.username) {
      formData.append("username", formFields.userName);
    }
    if (formFields.email !== singleUser?.email) {
      formData.append("email", formFields.email);
    }
    if (image) {
      formData.append("file", image);
    }
    formData.append("role", formFields.role);
    formData.append("name", formFields.name);
    formData.append("position", formFields.position);
    formData.append("gender", formFields.gender);

    await dispatch(editUserByAdminAction(singleUser?._id, formData));
    await dispatch(getAllUsersAction());
    setIsLoading(false);
    return navigate("/dashboard/users");
  };

  useEffect(() => {
    const userId = location.pathname.split("/").slice(-1);
    dispatch(getSingleUserByAdminAction(userId));
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (singleUser) {
      setFormFields({
        name: singleUser?.name,
        userName: singleUser?.username,
        email: singleUser?.email,
        position: singleUser?.position,
        gender: singleUser?.gender,
        role: singleUser?.role,
      });
      setImgSrc(singleUser?.image.url);
    }
  }, [singleUser]);
  return (
    <div className="p-4">
      <div className="p-4 lg:p-6 rounded-lg bg-[#eef2f56e]">
        <h2 className="text-md lg:text-xl font-semibold">Edit User</h2>
        <form className="grid lg:grid-cols-12 gap-4 xl:gap-8 mt-4 lg:mt-6" onSubmit={submitHandler}>
          <div className="lg:col-span-9">
            <div className="grid lg:grid-cols-12 gap-4">
              <div className="lg:col-span-6">
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  value={formFields.name}
                  onChange={handleFormFields}
                />
              </div>
              <div className="lg:col-span-6">
                <Input
                  label="Username"
                  type="text"
                  name="userName"
                  value={formFields.userName}
                  onChange={handleFormFields}
                />
              </div>
              <div className="lg:col-span-6">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formFields.email}
                  onChange={handleFormFields}
                />
              </div>
              <div className="lg:col-span-6">
                <Input
                  label="Position"
                  type="text"
                  name="position"
                  value={formFields.position}
                  onChange={handleFormFields}
                />
              </div>
              <div className="lg:col-span-6">
                <label className="text-[#000] text-sm md:text-base mb-2 block">Gender</label>
                <select
                  value={formFields.gender}
                  onChange={handleFormFields}
                  name=""
                  className="bg-[#f7fbfe] rounded-[10px] border text-sm md:text-base w-full h-[50px] md:h-[60px] focus:outline-none px-4"
                >
                  <option className="p-4 h-10" value="male">
                    Male
                  </option>
                  <option className="p-4" value="female">
                    Female
                  </option>
                </select>
              </div>
              {/* <div className="lg:col-span-6">
                <label className="text-[#000] text-sm md:text-base mb-2 block">Role</label>
                <select
                  value={formFields.role}
                  onChange={handleFormFields}
                  name=""
                  className="bg-[#f7fbfe] rounded-[10px] border text-sm md:text-base w-full h-[50px] md:h-[60px] focus:outline-none px-4"
                >
                  <option className="p-4 h-10" value="user">
                    User
                  </option>
                  <option className="p-4" value="admin">
                    Admin
                  </option>
                </select>
              </div> */}
            </div>
          </div>
          <div className="lg:col-span-3">
            <img
              src={imgSrc || profileImg}
              alt="image"
              className="w-full h-[200px] lg:h-[300px] object-cover rounded-lg border-2 border-primary"
            />
            <ChangeButton onChange={handleImageChange} />
          </div>
          <div className="lg:col-span-9 flex justify-end gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              height="h-[50px]"
              width="w-full md:w-[150px]"
              bg="#17A2B8"
              text="Save User"
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;

const ChangeButton = ({ onChange }) => {
  return (
    <button className="border border-primary rounded-lg cursor-pointer w-full mt-3 px-3 py-3 text-primary text-sm md:text-base font-medium relative">
      Change
      <input type="file" className="absolute inset-0 cursor-pointer opacity-0" onChange={onChange} />
    </button>
  );
};
