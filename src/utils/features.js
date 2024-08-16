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

  if (!day || typeof day !== "string") {
    console.error("Invalid day input");
    return isReturn ? null : false;
  }

  const todayIndex = new Date().getDay();
  const dayLowerCase = day.toLowerCase().slice(0, 3);

  if (!daysOfWeek.includes(dayLowerCase)) {
    console.error("Day not recognized");
    return isReturn ? null : false;
  }

  if (isReturn) {
    return fullDaysOfWeek[daysOfWeek.indexOf(dayLowerCase)];
  }

  return daysOfWeek[todayIndex] === dayLowerCase;
};
// formate date which come from mongodb
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const isoString = date.toISOString();
  return isoString.slice(0, 16);
};

// how much time left for this task
function getPercentTimeCompleted(startDate, endDate) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalTime = end - start;
  const timePassed = now - start;
  const percentTimeCompleted = (timePassed / totalTime) * 100;
  return Math.max(0, Math.min(100, percentTimeCompleted));
}
export {
  generateCloudinaryDownloadUrl,
  handleDownloadAll,
  isToday,
  formatDateForInput,
  getPercentTimeCompleted,
};
