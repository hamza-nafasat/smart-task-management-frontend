import React, { useState, useEffect } from 'react';
import pdfImg from '../../../../assets/images/tasks/pdf.png';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      startUpload(file);
    }
  };

  const startUpload = (file) => {
    setIsUploading(true);
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200);
  };

  const handleCancelUpload = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setSelectedFile(null);
  };

  return (
    <div className="py-4">
      {selectedFile ? (
        <div className="py-4 flex items-center">
          <img
            src={pdfImg}
            alt="PDF Icon"
            className="w-8 h-8 mr-4"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <div className='text-[13px] font-semibold text-[#333333]'>{selectedFile.name}</div>
              <div className='text-[#333333] text-[13px]'>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
            </div>
            {isUploading ? (
              <div className="relative">
                <div className="h-1 bg-gray-300 rounded-full">
                  <div
                    className="h-[6px] bg-teal-500 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <button
                  onClick={handleCancelUpload}
                  className="absolute right-0 top-0 mt-2 text-red-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="mt-2 text-teal-500">Upload Complete</div>
            )}
          </div>
        </div>
      ) : (
        <div className="border-dashed border-primary border rounded-md py-4 text-center bg-[#f2f2f2]">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer text-[#828282]">
            <span className="text-primary font-bold">Choose a file</span> or drag it here
          </label>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
