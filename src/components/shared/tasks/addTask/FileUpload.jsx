/* eslint-disable react/prop-types */
import { useState } from "react";
import pdfImg from "../../../../assets/images/tasks/pdf.png";
import { IoClose } from "react-icons/io5";

const FileUpload = ({ selectedFile, setSelectedFile }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFile((prevSelectedFile) => [...prevSelectedFile, ...files]);
    }
  };
  const removeFileFromSelectedFileHandler = (e, file) => {
    e.preventDefault();
    setSelectedFile((prevSelectedFile) => prevSelectedFile.filter((f) => f.name !== file.name));
  };

  // const startUpload = (file) => {
  //   setIsUploading(true);
  //   // Simulate upload progress
  //   const interval = setInterval(() => {
  //     setUploadProgress((prevProgress) => {
  //       if (prevProgress >= 100) {
  //         clearInterval(interval);
  //         setIsUploading(false);
  //         return 100;
  //       }
  //       return prevProgress + 10;
  //     });
  //   }, 200);
  // };

  const handleCancelUpload = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setSelectedFile(null);
  };

  return (
    <div className="py-4 ">
      {/* if file is selected  */}
      {selectedFile?.length > 0
        ? selectedFile?.map((file, i) => (
            <div key={i} className="py-4 flex items-center">
              <img src={pdfImg} alt="PDF Icon" className="w-8 h-8 mr-4" />
              <div className="flex-1">
                <div className="w-full flex justify-end ">
                  <button onClick={(e) => removeFileFromSelectedFileHandler(e, file)}>
                    <IoClose style={{ color: "red", cursor: "pointer", fontSize: "30px" }} />
                  </button>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-[13px] font-semibold text-[#333333]">{file.name}</div>
                  <div className="text-[#333333] text-[13px]">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
                {isUploading ? (
                  <div className="relative">
                    <div className="h-1 bg-gray-300 rounded-full">
                      <div
                        className="h-[6px] bg-teal-500 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <button onClick={handleCancelUpload} className="absolute right-0 top-0 mt-2 text-red-500">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 text-teal-500">Upload Complete</div>
                )}
              </div>
            </div>
          ))
        : ""}

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
  );
};
export default FileUpload;
