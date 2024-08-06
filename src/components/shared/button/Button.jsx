/* eslint-disable react/prop-types */
import React from "react";

const Button = ({
  type = "button",
  bg = "#17A2B8",
  width = "100%",
  height = "60px",
  radius = "4px",
  color = "#fff",
  text,
  change,
  click,
  size,
  weight,
  disabled,
}) => {
  const style = {
    backgroundColor: bg,
    width: width,
    height: height,
    borderRadius: radius,
    color: color,
    fontSize: size,
    fontWeight: weight,
  };

  return (
    <button
      type={type}
      style={style}
      className="flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      onChange={change}
      onClick={click}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
