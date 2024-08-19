import { createSlice } from "@reduxjs/toolkit/react";

const initialState = {
  user: null,
  users: [],
  singleUser: null,
  loading: false,
  error: null,
  message: null,
  userDetails: null,
};

const userSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    // register slice
    registerStart(state) {
      state.loading = true;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // import users from excel file
    // ------------------------------
    importUsersStart(state) {
      state.loading = true;
    },
    importUsersSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    importUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // get single user
    getSingleUserStart(state) {
      state.loading = true;
    },
    getSingleUserSuccess(state, action) {
      state.loading = false;
      state.singleUser = action.payload.data;
      state.message = action.payload.message;
    },
    getSingleUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // edit user by admin
    // -------------------
    editUserByAdminStart(state) {
      state.loading = true;
    },
    editUserByAdminSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    editUserByAdminFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // delete user by admin
    // -------------------
    deleteUserByAdminStart(state) {
      state.loading = true;
    },
    deleteUserByAdminSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteUserByAdminFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // login slice
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.data;
      state.message = action.payload.message;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // get all users
    allUsersStart(state) {
      state.loading = true;
    },
    allUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload.data;
    },
    allUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // logout slice
    logoutStart(state) {
      state.loading = true;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.user = null;
      state.message = action.payload.message;
    },
    logoutFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // forget password
    forgetPasswordStart(state) {
      state.loading = true;
    },
    forgetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    forgetPasswordFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // reset password
    resetPasswordStart(state) {
      state.loading = true;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    resetPasswordFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // change password
    changePasswordStart(state) {
      state.loading = true;
    },
    changePasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    changePasswordFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // get my profile
    getMyProfileStart(state) {
      state.loading = true;
    },
    getMyProfileSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.data;
    },
    getMyProfileFailure(state) {
      state.loading = false;
    },

    // first login
    firstLoginStart(state) {
      state.loading = false;
    },
    firstLoginSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    firstLoginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // update profile
    updateProfileStart(state) {
      state.loading = true;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateProfileFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // get all user details
    getAllUserDetailsStart(state) {
      state.loading = true;
    },
    getAllUserDetailsSuccess(state, action) {
      state.loading = false;
      state.userDetails = action.payload.data;
    },
    getAllUserDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // clear error and message
    clearUserError(state) {
      state.error = null;
    },
    clearUserMessage(state) {
      state.message = null;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,

  importUsersStart,
  importUsersSuccess,
  importUsersFailure,

  getSingleUserStart,
  getSingleUserSuccess,
  getSingleUserFailure,

  editUserByAdminStart,
  editUserByAdminSuccess,
  editUserByAdminFailure,

  deleteUserByAdminStart,
  deleteUserByAdminSuccess,
  deleteUserByAdminFailure,

  allUsersStart,
  allUsersSuccess,
  allUsersFailure,

  loginStart,
  loginFailure,
  loginSuccess,

  firstLoginStart,
  firstLoginSuccess,
  firstLoginFailure,

  logoutStart,
  logoutSuccess,
  logoutFailure,

  forgetPasswordStart,
  forgetPasswordSuccess,
  forgetPasswordFailure,

  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,

  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,

  getMyProfileStart,
  getMyProfileSuccess,
  getMyProfileFailure,

  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,

  getAllUserDetailsStart,
  getAllUserDetailsSuccess,
  getAllUserDetailsFailure,

  clearUserError,
  clearUserMessage,
} = userSlice.actions;

export default userSlice;
