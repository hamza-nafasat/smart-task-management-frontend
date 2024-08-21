import { customAxios } from "../../utils/customAxios";
import {
  getUnreadNotificationsFailure,
  getUnreadNotificationsStart,
  getUnreadNotificationsSuccess,
} from "../slices/notificationsSlices";

// get all notifications action
// ----------------------
const getUnreadNotificationsAction = () => async (dispatch) => {
  try {
    dispatch(getUnreadNotificationsStart());
    const response = await customAxios.get("/tasks/get-unread-notifications/all");
    console.log("success while get all notifications", response);
    dispatch(getUnreadNotificationsSuccess(response.data?.data));
  } catch (error) {
    console.log("error while get all notifications", error);
    dispatch(
      getUnreadNotificationsFailure(
        error?.response?.data?.message || "Some Error Occurred While Fetching Notifications"
      )
    );
  }
};

export { getUnreadNotificationsAction };
