/* eslint-disable react/prop-types */
import { useState } from "react";
import Input from "../../../components/auth/Input";
import profileImg from "../../../assets/images/profile.png";
import Button from "../../../components/shared/button/Button";
import { addUserAction, getAllUsersAction } from "../../../redux/actions/usersActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    userName: "",
    email: "",
    position: "",
    gender: "",
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
    setIsLoading(true);
    console.log("form field", formFields);
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formFields.name);
    formData.append("username", formFields.userName);
    formData.append("email", formFields.email);
    formData.append("position", formFields.position);
    formData.append("gender", "male");
    formData.append("file", image);
    formData.append("password", "12345678");
    await dispatch(addUserAction(formData));
    await dispatch(getAllUsersAction());
    setIsLoading(true);
    return navigate("/dashboard/users");
  };
  return (
    <div className="md:h-screen p-4">
      <div className="p-4 lg:p-6 rounded-lg bg-[#eef2f56e]">
        <div className="flex justify-end">
          <Button text="Import Users" width="w-[130px] md:w-[150px]" height="h-[40px]" />
        </div>
        <h2 className="text-md lg:text-xl font-semibold mt-3">Add User</h2>
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
                  name="gender"
                  value={formFields.gender}
                  onChange={handleFormFields}
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
              disabled={isLoading}
              type="submit"
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

export default AddUser;

const ChangeButton = ({ onChange }) => {
  return (
    <button className="border border-primary rounded-lg cursor-pointer w-full mt-3 px-3 py-3 text-primary text-sm md:text-base font-medium relative">
      Change
      <input type="file" className="absolute inset-0 cursor-pointer opacity-0" onChange={onChange} />
    </button>
  );
};
