import axios from "axios";
import JSZip from "jszip";

// making the cloudinary download url from normal url
const generateCloudinaryDownloadUrl = (secureUrl) => {
  const downloadUrl = secureUrl.replace("/upload/", "/upload/fl_attachment/");
  return downloadUrl;
};

// handle all file download with cloudinary url array
const handleDownloadAll = async (attachments) => {
  try {
    const zip = new JSZip();
    const promises = attachments.map(async (attachment) => {
      const response = await axios.get(attachment.url, { responseType: "blob" });
      zip.file(attachment.name, response.data, { binary: true });
    });
    await Promise.all(promises);
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = "all_attachments.zip";
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading files:", error);
  }
};

const isToday = (day, isReturn = false) => {
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const fullDaysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const today = new Date().getDay();
  const dayLowerCase = day.toLowerCase();
  if (isReturn) {
    return daysOfWeek[today] === dayLowerCase ? fullDaysOfWeek[today] : fullDaysOfWeek[today];
  } else {
    return daysOfWeek[today] === dayLowerCase ? true : false;
  }
};

const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const isoString = date.toISOString();
  return isoString.slice(0, 16);
};
export { generateCloudinaryDownloadUrl, handleDownloadAll, isToday, formatDateForInput };