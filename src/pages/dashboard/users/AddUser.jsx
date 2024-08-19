/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import profileImg from "../../../assets/images/profile.png";
import excelImg from "../../../assets/images/tasks/xl.png";
import Input from "../../../components/auth/Input";
import Button from "../../../components/shared/button/Button";
import { addUserAction, getAllUsersAction, importUsersAction } from "../../../redux/actions/usersActions";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.users);
  const [imgSrc, setImgSrc] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    userName: "",
    email: "",
    position: "",
    gender: "",
  });

  const handleModalClose = () => setIsModalOpen(false);
  const handleModalOpen = () => setIsModalOpen(true);

  const handleFormFields = (e) => {
    const { name, value } = e.target;
    if (name && value) {
      setFormFields({
        ...formFields,
        [name]: value,
      });
    }
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
    try {
      if (!image) {
        setIsLoading(false);
        return toast.error("Please Select an Image");
      }
      const formData = new FormData();
      formData.append("name", formFields.name);
      formData.append("username", formFields.userName);
      formData.append("email", formFields.email);
      formData.append("position", formFields.position);
      formData.append("gender", formFields.gender);
      formData.append("file", image);
      formData.append("password", "12345678");
      await dispatch(addUserAction(formData));
      await dispatch(getAllUsersAction());
      setIsLoading(true);
    } catch (error) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (message) return navigate("/dashboard/users");
  }, [message, dispatch, navigate]);
  return (
    <div className="md:h-screen p-4">
      <div className="p-4 lg:p-6 rounded-lg bg-[#eef2f56e]">
        <div className="flex justify-end">
          <Button
            click={handleModalOpen}
            text="Import Users"
            width="w-[130px] md:w-[150px]"
            height="h-[40px]"
          />
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
                  <option className="p-4 h-10" value="#">
                    Select gender
                  </option>
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
        {isModalOpen && <AddExcelFileModal onclose={handleModalClose} />}
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

// add excel file modal
const AddExcelFileModal = ({ onclose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { message } = useSelector((state) => state.users);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!selectedFile) return toast.error("Please Select a file first");
      const formData = new FormData();
      formData.append("file", selectedFile);
      await dispatch(importUsersAction(formData));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (message) return onclose();
  }, [message, onclose]);
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm drop-shadow-2xl w-full p-4 flex items-center justify-center z-[999] transition-all duration-500"
      onClick={onclose}
    >
      <div
        className="p-4 bg-white rounded-md w-full md:w-[400px] overflow-y-scroll scrollbar-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white my-4 xl:my-6 rounded-lg p-4 xl:p-6">
          {selectedFile && <img className="h-20 mb-2 mx-auto" src={excelImg} alt="selected" />}
          <div className="border-dashed border-primary border rounded-md py-4 text-center bg-[#f2f2f2]">
            <input type="file" multiple onChange={handleFileChange} className="hidden" id="file-upload" />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-xs sm:text-sm md:text-base text-[#828282]"
            >
              <span className="text-primary font-bold">Choose a file</span> or drag it here
            </label>
          </div>
        </div>
        <Button disabled={isLoading} text="Submit" click={handleSubmit} height="h-[40px]" />
      </div>
    </div>
  );
};
