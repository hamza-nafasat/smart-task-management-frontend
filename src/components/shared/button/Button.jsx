/* eslint-disable react/prop-types */
import React from "react";

const Button = ({
  type = "button",
  bg = "#17A2B8",
  width,
  height,
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
    borderRadius: radius,
    color: color,
    fontWeight: weight,
  };

  return (
    <button
      type={type}
      style={style}
      className={`flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${
        width ? width : "w-full"
      } ${height ? height : "h-50px md:h-[60px]"} ${size ? size: 'text-sm mdtext-md'}`}
      onChange={change}
      onClick={click}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
