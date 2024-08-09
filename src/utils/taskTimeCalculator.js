export const taskTimeLeft = (taskEndDate) => {
  const currentTime = new Date();
  const endTime = new Date(taskEndDate);
  const timeDifference = endTime - currentTime;
  if (timeDifference <= 0) {
    const elapsedTime = Math.abs(timeDifference); // Get the absolute value
    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      return "Task completed Today";
    }
    return `Task completed ${days}d ago`;
  }
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s left`;
};
