import React, { useState } from "react";
import Input from "../../../components/auth/Input";
import profileImg from "../../../assets/images/tasks/dp.png";
import Button from "../../../components/shared/button/Button";

const AddUser = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [formFields, setFormFields] = useState({
    name: "",
    userName: '',
    email: '',
    position: '',
    gender: '',
  });

  const handleFormFields = (e) => {
    const {name, value} = e.target;
    setFormFields({
      ...formFields,
      [name]: value
    })
  }

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
  return (
    <div className="h-[calc(100vh-80px)] p-4">
      <div className="p-4 lg:p-6 rounded-lg bg-[#eef2f56e]">
        <div className="flex justify-end">
          <Button text='Import Users' width="150px" height='40px' />
        </div>
        <h2 className="text-md lg:text-xl font-semibold mt-3">Add User</h2>
        <form className="grid lg:grid-cols-12 gap-4 xl:gap-8 mt-4 lg:mt-6">
          <div className="lg:col-span-9">
            <div className="grid lg:grid-cols-12 gap-4">
              <div className="lg:col-span-6">
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  value={formFields.name}
                  change={handleFormFields}
                />
              </div>
              <div className="lg:col-span-6">
                <Input
                  label="Username"
                  type="text"
                  name="userName"
                  value={formFields.userName}
                  change={handleFormFields}
                />
              </div>
              <div className="lg:col-span-6">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formFields.email}
                  change={handleFormFields}
                />
              </div>
              <div className="lg:col-span-6">
                <Input
                  label="Position"
                  type="text"
                  name="position"
                  value={formFields.position}
                  change={handleFormFields}
                />
              </div>
              <div className="lg:col-span-6">
                <Input
                  label="Gender"
                  type="text"
                  name="gender"
                  value={formFields.gender}
                  change={handleFormFields}
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
              bg='#17A2B8'
              text='Save User'
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
    <button className="border border-primary rounded-lg cursor-pointer w-full mt-3 px-3 py-3 text-primary text-base font-medium relative">
      Change
      <input
        type="file"
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={onChange}
      />
    </button>
  );
};
