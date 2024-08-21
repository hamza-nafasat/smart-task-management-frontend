import { customAxios } from "../../utils/customAxios";
import {
  deleteNotificationFailure,
  deleteNotificationStart,
  deleteNotificationSuccess,
  getAllNotificationsFailure,
  getAllNotificationsStart,
  getAllNotificationsSuccess,
  getUnreadNotificationsFailure,
  getUnreadNotificationsStart,
  getUnreadNotificationsSuccess,
  readAllNotificationsFailure,
  readAllNotificationsStart,
  readAllNotificationsSuccess,
} from "../slices/notificationsSlices";

// get unread notifications action
// ----------------------
const getUnreadNotificationsAction = () => async (dispatch) => {
  try {
    dispatch(getUnreadNotificationsStart());
    const response = await customAxios.get("/tasks/unread-notifications/all");
    console.log("success while get unread notifications", response);
    dispatch(getUnreadNotificationsSuccess(response?.data?.data));
  } catch (error) {
    console.log("error while get unread notifications", error);
    dispatch(
      getUnreadNotificationsFailure(
        error?.response?.data?.message || "Some Error Occurred While Fetching Notifications"
      )
    );
  }
};
// get all notifications action
// ----------------------
const getAllNotificationsAction = () => async (dispatch) => {
  try {
    dispatch(getAllNotificationsStart());
    const response = await customAxios.get("/tasks/all-notifications");
    console.log("success while get all notifications", response);
    dispatch(getAllNotificationsSuccess(response.data));
  } catch (error) {
    console.log("error while get all notifications", error);
    dispatch(
      getAllNotificationsFailure(
        error?.response?.data?.message || "Some Error Occurred While Fetching Notifications"
      )
    );
  }
};

// read all notifications
// ----------------------
const readAllNotificationsAction = () => async (dispatch) => {
  try {
    dispatch(readAllNotificationsStart());
    const response = await customAxios.get("/tasks/read-all-notifications");
    console.log("success while read all notifications", response);
    dispatch(readAllNotificationsSuccess(response.data));
  } catch (error) {
    console.log("error while read all notifications", error);
    dispatch(
      readAllNotificationsFailure(
        error?.response?.data?.message || "Some Error Occurred While Fetching Notifications"
      )
    );
  }
};

// delete notifications
// ----------------------
const deleteNotificationAction = (notificationId) => async (dispatch) => {
  try {
    dispatch(deleteNotificationStart());
    const response = await customAxios.delete(`/tasks/single-notification/${notificationId}`);
    console.log("success while delete a notification", response);
    dispatch(deleteNotificationSuccess(response?.data));
  } catch (error) {
    dispatch(
      deleteNotificationFailure(error?.response?.date?.message || "Error while deleting notification")
    );
    console.log("error while get delete a notification", error);
  }
};

export {
  getUnreadNotificationsAction,
  getAllNotificationsAction,
  readAllNotificationsAction,
  deleteNotificationAction,
};
