/* eslint-disable react/prop-types */
const Input = ({ label, error, ...rest }) => {
  return (
    <div className="mb-4">
      <label className="text-[#000] text-sm md:text-base mb-2 block">{label}</label>
      <input
        {...rest}
        className={`bg-[#f7fbfe] border text-sm md:text-base ${
          error ? "border-red-500" : "border-[#e2e5ff]"
        } rounded-[10px] max-w-full w-full h-[50px] md:h-[60px] focus:outline-none px-4`}
      />
      {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
    </div>
  );
};

export default Input;
