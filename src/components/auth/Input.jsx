/* eslint-disable react/prop-types */
const Input = ({ label, type, id, change, click, name, placeholder, error, readOnly, value }) => {
  return (
    <div className="mb-4">
      <label className="text-[#000] text-base mb-2 block">{label}</label>
      <input
        onChange={change}
        onClick={click}
        type={type}
        id={id}
        name={name}
        className={`bg-[#f7fbfe] border ${
          error ? "border-red-500" : "border-[#e2e5ff]"
        } rounded-[10px] w-full h-[50px] md:h-[60px] focus:outline-none px-4`}
        placeholder={placeholder}
        readOnly={readOnly}
        value={value}
      />
      {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
    </div>
  );
};

export default Input;
