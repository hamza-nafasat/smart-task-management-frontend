/* eslint-disable react/prop-types */
import DownloadIcon from "../../../assets/svgs/tasks/DownloadIcon";
import { generateCloudinaryDownloadUrl, handleDownloadAll } from "../../../utils/features";
import { formatFileSize } from "../../../utils/formatting";
import fileLogo from "../../../assets/fileLogo.png";

const TaskAttachments = ({ attachments }) => {
  return (
    <div className="bg-white rounded-lg px-4 md:px-5 py-4 xl:py-6">
      {attachments.length > 0 && (
        <div className="flex items-center justify-between">
          <h5 className="text-xs md:text-sm font-semibold text-[#333333]">
            Attachments ({attachments.length || 0})
          </h5>
          <p
            onClick={() => handleDownloadAll(attachments)}
            className="text-primary text-[11px] cursor-pointer"
          >
            Download all
          </p>
        </div>
      )}
      <table className="w-full mt-4 xl:mt-7">
        <tbody>
          {attachments.length > 0 ? (
            attachments?.map((attachment, i) => (
              <tr key={i}>
                <td className="pb-4 xl:pd-6">
                  <img src={fileLogo} alt={attachment?.name + i} className="w-4 md:w-8" />
                </td>
                <td className="pb-4 xl:pd-6">
                  <h4 className="text-[10px] md:text-xs font-semibold text-[#333333]">{attachment?.name}</h4>
                </td>
                <td className="pb-4 xl:pd-6 text-[11px] md:text-[13px] text-[#4f4f4f]">
                  {formatFileSize(attachment?.size)}
                </td>
                <td className="text-end pb-4 xl:pd-6 cursor-pointer">
                  <a href={generateCloudinaryDownloadUrl(attachment?.url)} download>
                    <DownloadIcon />
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr className="h-[50px]">
                <td colSpan={4} className="text-center pb-5">
                  No Attachments Uploaded
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskAttachments;
