import { customAxios, customFormAxios } from "../../utils/customAxios";
import {
  allUsersFailure,
  allUsersStart,
  allUsersSuccess,
  changePasswordFailure,
  changePasswordStart,
  changePasswordSuccess,
  deleteUserByAdminFailure,
  deleteUserByAdminStart,
  deleteUserByAdminSuccess,
  editUserByAdminFailure,
  editUserByAdminStart,
  editUserByAdminSuccess,
  firstLoginFailure,
  firstLoginStart,
  forgetPasswordFailure,
  forgetPasswordStart,
  forgetPasswordSuccess,
  getAllUserDetailsFailure,
  getAllUserDetailsStart,
  getAllUserDetailsSuccess,
  getMyProfileStart,
  getMyProfileSuccess,
  getSingleUserFailure,
  getSingleUserStart,
  getSingleUserSuccess,
  importUsersFailure,
  importUsersStart,
  importUsersSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
  resetPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  updateProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
} from "../slices/usersSlices";

// add user action
// ---------------
const addUserAction = (formData) => async (dispatch) => {
  try {
    dispatch(registerStart());
    const response = await customFormAxios.post("/users/create", formData);
    // console.log("success while register", response);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    // console.log("error while register", error);
    dispatch(registerFailure(error?.response?.data?.message || "Some Error Occurred While Register"));
  }
};

// import users from excel
// ---------------
const importUsersAction = (formData) => async (dispatch) => {
  try {
    dispatch(importUsersStart());
    const response = await customFormAxios.post("/users/register-from-excel", formData);
    console.log("success while import users", response);
    dispatch(importUsersSuccess(response.data));
  } catch (error) {
    // console.log("error while import users", error);
    dispatch(importUsersFailure(error?.response?.data?.message || "Some Error Occurred While Import Users"));
  }
};

// edit user action by admin
// -------------------
const editUserByAdminAction = (id, formData) => async (dispatch) => {
  try {
    dispatch(editUserByAdminStart());
    const response = await customFormAxios.put(`/users/single/${id}`, formData);
    // console.log("success while edit user by admin", response);
    dispatch(editUserByAdminSuccess(response.data));
  } catch (error) {
    // console.log("error while edit user by admin", error);
    dispatch(
      editUserByAdminFailure(error?.response?.data?.message || "Some Error Occurred While Edit User By Admin")
    );
  }
};

// get single user
// ---------------
const getSingleUserByAdminAction = (id) => async (dispatch) => {
  try {
    dispatch(getSingleUserStart());
    const response = await customAxios.get(`/users/single/${id}`);
    // console.log("success while get single user", response);
    dispatch(getSingleUserSuccess(response.data));
  } catch (error) {
    // console.log("error while get single user", error);
    dispatch(
      getSingleUserFailure(error?.response?.data?.message || "Some Error Occurred While Get Single User")
    );
  }
};

// delete user by admin action
// -------------------
const deleteUserByAdminAction = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserByAdminStart());
    const response = await customAxios.delete(`/users/single/${id}`);
    // console.log("success while delete user by admin", response);
    dispatch(deleteUserByAdminSuccess(response.data));
  } catch (error) {
    // console.log("error while delete user by admin", error);
    dispatch(
      deleteUserByAdminFailure(
        error?.response?.data?.message || "Some Error Occurred While Delete User By Admin"
      )
    );
  }
};

// user login action
// -----------------
const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await customAxios.post("/users/login", { email, password });
    // console.log("success while login", response);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    // console.log("error while login", error);
    dispatch(loginFailure(error?.response?.data?.message || "Some Error Occurred While Login"));
  }
};

// user logout action
// -----------------
const logoutAction = () => async (dispatch) => {
  try {
    dispatch(logoutStart());
    const response = await customAxios.get("/users/logout");
    // console.log("success while logout", response);
    dispatch(logoutSuccess(response.data));
  } catch (error) {
    // console.log("error while logout", error);
    dispatch(logoutFailure(error?.response?.data?.message || "Some Error Occurred While Logout"));
  }
};

// first login action
// -----------------
const firstLoginAction = () => async (dispatch) => {
  try {
    dispatch(firstLoginStart());
    await customAxios.get("/users/first-login");
    // console.log("success while first login", response);
  } catch (error) {
    // console.log("error while first login", error);
    dispatch(firstLoginFailure(error?.response?.data?.message || "Some Error Occurred While First Login"));
  }
};

// get all users action
// -----------------
const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch(allUsersStart());
    const response = await customAxios.get("/users/all-users");
    console.log("success while get all users", response);
    dispatch(allUsersSuccess(response.data));
  } catch (error) {
    // console.log("error while get all users", error);
    dispatch(allUsersFailure(error?.response?.data?.message || "Some Error Occurred While Get All Users"));
  }
};

// forget password action
// -----------------
const forgetPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch(forgetPasswordStart());
    const response = await customAxios.post("/users/forget-password", { email });
    // console.log("success while forget password", response);
    dispatch(forgetPasswordSuccess(response.data));
  } catch (error) {
    // console.log("error while forget password", error);
    dispatch(
      forgetPasswordFailure(error?.response?.data?.message || "Some Error Occurred While Forget Password")
    );
  }
};

// reset password action
// -----------------
const resetPasswordAction = (newPassword, resetToken) => async (dispatch) => {
  try {
    dispatch(resetPasswordStart());
    const response = await customAxios.put(`/users/reset-password/${resetToken}`, { newPassword });
    // console.log("success while reset password", response);
    dispatch(resetPasswordSuccess(response.data));
  } catch (error) {
    // console.log("error while reset password", error);
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
    // console.log("success while get my profile", response);
    dispatch(getMyProfileSuccess(response.data));
  } catch (error) {
    // console.log("error while get my profile", error);
  }
};

// update my profile
// -----------------
const updateProfileAction = (formDate) => async (dispatch) => {
  try {
    dispatch(updateProfileStart());
    const response = await customFormAxios.put("/users/my-profile", formDate);
    // console.log("success while update my profile", response);
    dispatch(updateProfileSuccess(response.data));
  } catch (error) {
    // console.log("error while update my profile", error);
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
    // console.log("success while change password", response);
    dispatch(changePasswordSuccess(response.data));
    if (response.data) {
      await customAxios.get("/users/first-login");
    }
  } catch (error) {
    // console.log("error while change password", error);
    dispatch(
      changePasswordFailure(error?.response?.data?.message || "Some Error Occurred While Change Password")
    );
  }
};

// get all user details actions
// ----------------------------
const getAllUserDetailsAction = (userId) => async (dispatch) => {
  try {
    dispatch(getAllUserDetailsStart());
    const response = await customAxios.get(`/users/details/single-user/${userId}`);
    console.log("success while get all user details", response.data);
    dispatch(getAllUserDetailsSuccess(response.data));
  } catch (error) {
    console.log("error while get all user details", error);
    dispatch(
      getAllUserDetailsFailure(
        error?.response?.data?.message || "Some Error Occurred While Get All User Details"
      )
    );
  }
};

export {
  addUserAction,
  changePasswordAction,
  deleteUserByAdminAction,
  editUserByAdminAction,
  firstLoginAction,
  forgetPasswordAction,
  getAllUsersAction,
  getMyProfileAction,
  getSingleUserByAdminAction,
  loginAction,
  logoutAction,
  resetPasswordAction,
  updateProfileAction,
  getAllUserDetailsAction,
  importUsersAction,
};
