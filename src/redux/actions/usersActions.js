import { customAxios } from "../../utils/customAxios";
import {
  changePasswordFailure,
  changePasswordStart,
  changePasswordSuccess,
  firstLoginFailure,
  firstLoginStart,
  firstLoginSuccess,
  forgetPasswordFailure,
  forgetPasswordStart,
  forgetPasswordSuccess,
  getMyProfileStart,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  resetPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  updateProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
} from "../slices/usersSlices";

// user login action
// -----------------
const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await customAxios.post("/users/login", { email, password });
    console.log("success while login", response);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    console.log("error while login", error);
    dispatch(loginFailure(error?.response?.data?.message || "Some Error Occurred While Login"));
  }
};

// user logout action
// -----------------
const logoutAction = () => async (dispatch) => {
  try {
    dispatch(logoutStart());
    const response = await customAxios.get("/users/logout");
    console.log("success while logout", response);
    dispatch(logoutSuccess(response.data));
  } catch (error) {
    console.log("error while logout", error);
    dispatch(logoutFailure(error?.response?.data?.message || "Some Error Occurred While Logout"));
  }
};

// first login action
// -----------------
const firstLoginAction = () => async (dispatch) => {
  try {
    dispatch(firstLoginStart());
    const response = await customAxios.get("/users/first-login");
    console.log("success while first login", response);
    dispatch(firstLoginSuccess(response.data));
  } catch (error) {
    console.log("error while first login", error);
    dispatch(firstLoginFailure(error?.response?.data?.message || "Some Error Occurred While First Login"));
  }
};

// forget password action
// -----------------
const forgetPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch(forgetPasswordStart());
    const response = await customAxios.post("/users/forget-password", { email });
    console.log("success while forget password", response);
    dispatch(forgetPasswordSuccess(response.data));
  } catch (error) {
    console.log("error while forget password", error);
    dispatch(
      forgetPasswordFailure(error?.response?.data?.message || "Some Error Occurred While Forget Password")
    );
  }
};

// reset password action
// -----------------
const resetPasswordAction = (password, token) => async (dispatch) => {
  try {
    dispatch(resetPasswordStart());
    const response = await customAxios.put(`/users/reset-password/${token}`, { password });
    console.log("success while reset password", response);
    dispatch(resetPasswordSuccess(response.data));
  } catch (error) {
    console.log("error while reset password", error);
    dispatch(
      resetPasswordFailure(error?.response?.data?.message || "Some Error Occurred While Reset Password")
    );
  }
};

// get my profile
// -----------------
const getMyProfileAction = () => async (dispatch) => {
  try {
    dispatch(getMyProfileStart());
    const response = await customAxios.get("/users/my-profile");
    console.log("success while get my profile", response);
  } catch (error) {
    console.log("error while get my profile", error);
  }
};

// update my profile
// -----------------
const updateProfileAction = (name, email) => async (dispatch) => {
  try {
    dispatch(updateProfileStart());
    const response = await customAxios.put("/users/me", { name, email });
    console.log("success while update my profile", response);
    dispatch(updateProfileSuccess(response.data));
  } catch (error) {
    console.log("error while update my profile", error);
    dispatch(
      updateProfileFailure(error?.response?.data?.message || "Some Error Occurred While Update My Profile")
    );
  }
};

// change password
// -----------------
const changePasswordAction = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch(changePasswordStart());
    const response = await customAxios.put("/users/change-password", { oldPassword, newPassword });
    console.log("success while change password", response);
    dispatch(changePasswordSuccess(response.data));
  } catch (error) {
    console.log("error while change password", error);
    dispatch(
      changePasswordFailure(error?.response?.data?.message || "Some Error Occurred While Change Password")
    );
  }
};

export {
  changePasswordAction,
  firstLoginAction,
  forgetPasswordAction,
  getMyProfileAction,
  loginAction,
  logoutAction,
  resetPasswordAction,
  updateProfileAction,
};
