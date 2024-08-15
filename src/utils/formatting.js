// function for formatting the task time left
const taskTimeLeft = (taskEndDate, status = false) => {
  const currentTime = new Date();
  const endTime = new Date(taskEndDate);
  const timeDifference = endTime - currentTime;
  if (timeDifference <= 0) {
    const elapsedTime = Math.abs(timeDifference);
    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    if (status && status !== "completed") {
      return false;
    }
    if (status && status == "completed") {
      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        return "Task completed Today";
      }
      if (days) return `Task completed ${days}d ${hours}h ago`;
      if (hours) return `Task completed ${hours}h ${minutes}m ago`;
      if (minutes) return `Task completed ${minutes}m ${seconds}s ago`;
    }
  }
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  return `${days}d ${hours}h ${minutes}m left`;
};

// check how much time left for this task
function getTimeLeft(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  if (now >= end) {
    return "The task has already ended.";
  }
  const timeLeftMs = end - now;
  const days = Math.floor(timeLeftMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000);
  return `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds left.`;
}

// check is task cross the due date
const isTaskEndTimeEnded = (taskEndDate) => {
  const currentTime = new Date();
  const endTime = new Date(taskEndDate);
  const timeDifference = endTime - currentTime;
  if (timeDifference <= 0) {
    return true;
  }
  return false;
};

// function for formatting file size
const formatFileSize = (sizeInBytes) => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = sizeInBytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

// how much time ago i get this thing
const getTimeAgo = (createdAt) => {
  createdAt = new Date(createdAt);
  if (isNaN(createdAt)) {
    return "Invalid createdAt";
  }
  const now = new Date().getTime();
  const diff = now - Number(createdAt);

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} sec ago`;
  } else if (minutes < 60) {
    return `${minutes} min ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 12) {
    return `${months} mon ago`;
  } else {
    return `${years} years ago`;
  }
};

export { taskTimeLeft, formatFileSize, isTaskEndTimeEnded, getTimeAgo, getTimeLeft };
