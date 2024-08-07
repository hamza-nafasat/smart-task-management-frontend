/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Input from "../../../components/auth/Input";
import profileImg from "../../../assets/images/tasks/dp.png";
import Button from "../../../components/shared/button/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.users);
  const [imgSrc, setImgSrc] = useState("");
  const [isFormEdited, setIsFormEdited] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "name",
    userName: "username",
    role: "role",
    email: "email",
    position: "position",
    gender: "gender",
  });

  // handlers
  // ---------

  const handleFormEdit = () => setIsFormEdited(!isFormEdited);
  const handleFormFields = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfileHandler = async () => {
    console.log(formFields);
  };

  // useEffect
  // --------

  useEffect(() => {
    if (user) {
      setFormFields({
        name: user.name,
        userName: user.username,
        role: user.role,
        email: user.email,
        position: user.position,
        gender: user.gender,
      });
      setImgSrc(user?.image?.url);
    }
  }, [user]);
  return (
    <div className="p-4 h-[calc(100vh-80px)]">
      <div className="p-4 lg:p-6 rounded-lg bg-[#eef2f56e]">
        <h2 className="text-md lg:text-xl font-semibold">My Profile</h2>
        <form className="grid lg:grid-cols-12 gap-4 xl:gap-8 mt-4 lg:mt-6" onSubmit={updateProfileHandler}>
          <div className="lg:col-span-9">
            <div className="grid lg:grid-cols-12 gap-4">
              <div className="lg:col-span-6">
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  value={formFields.name}
                  onChange={handleFormFields}
                  readOnly={!isFormEdited}
                />
              </div>
              <div className="lg:col-span-6">
                <Input
                  label="Username"
                  type="text"
                  name="userName"
                  value={formFields.userName}
                  onChange={handleFormFields}
                  readOnly={!isFormEdited}
                />
              </div>
              <div className="lg:col-span-6">
                <Input
                  label="role"
                  type="text"
                  name="role"
                  value={formFields.role}
                  onChange={handleFormFields}
                  readOnly={true}
                />
              </div>
              <div className="lg:col-span-6">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formFields.email}
                  onChange={handleFormFields}
                  readOnly={!isFormEdited}
                />
              </div>
              <div className="lg:col-span-6">
                <Input
                  label="Position"
                  type="text"
                  name="position"
                  value={formFields.position}
                  onChange={handleFormFields}
                  readOnly={true}
                />
              </div>
              <div className="lg:col-span-6">
                <Input
                  label="Gender"
                  type="text"
                  name="gender"
                  value={formFields.gender}
                  onChange={handleFormFields}
                  readOnly={!isFormEdited}
                />
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
              height="50px"
              width="150px"
              bg={isFormEdited ? "#444444" : "#17A2B8"}
              text={isFormEdited ? "Cancel" : "Edit"}
              click={handleFormEdit}
            ></Button>
            {isFormEdited && <Button type="submit" height="50px" width="150px" text="Update"></Button>}
            <Link to="/dashboard/change-password">
              <Button height="50px" width="200px" text="Change Password" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

const ChangeButton = ({ onChange }) => {
  return (
    <button className="border border-primary rounded-lg cursor-pointer w-full mt-3 px-3 py-3 text-primary text-base font-medium relative">
      Change
      <input type="file" className="absolute inset-0 cursor-pointer opacity-0" onChange={onChange} />
    </button>
  );
};
