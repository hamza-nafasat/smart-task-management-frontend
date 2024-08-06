import React, { useState } from "react";
import Select from "react-select";
import { users } from "../../../../data/data";
import { components } from "react-select";
import { IoClose } from "react-icons/io5";

const MultiSelectUser = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserChange = (selectedUser) => {
    setSelectedUsers(selectedUser);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "2px solid #4fd1c5",
      borderRadius: "0.375rem",
      padding: "0.25rem",
      display: "flex",
      alignItems: "center",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "rgba(23, 162, 184, 1)",
      borderRadius: "0.375rem",
      display: "flex",
      alignItems: "center",
      padding: "0.45rem 0.25rem",
      color: "#fff",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#fff",
      padding: "0 0.25rem",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      paddingLeft: "0.25rem",
    }),
  };

  const MultiValueContainer = ({ children, ...props }) => (
    <components.MultiValueContainer {...props}>
      <img
        src={props.data.image}
        alt={props.data.label}
        className="w-6 h-6 rounded-full mr-1 object-cover"
      />
      {children}
    </components.MultiValueContainer>
  );

  const MultiValueRemove = (props) => (
    <components.MultiValueRemove {...props}>
      <IoClose className="text-white" />
    </components.MultiValueRemove>
  );

  return (
    <div className="mt-2">
      <Select
        options={users}
        value={selectedUsers}
        onChange={handleUserChange}
        isMulti={true}
        styles={customStyles}
        components={{ MultiValueContainer, MultiValueRemove }}
        placeholder="Select users"
      />
    </div>
  );
};

export default MultiSelectUser;
