import { createSlice } from "@reduxjs/toolkit/react";

const initialState = {
  unreadNotifications: [],
  allNotifications: [],
  loading: false,
  error: null,
  message: null,
};

const notificaitionsSlice = createSlice({
  initialState,
  name: "notifications",
  reducers: {
    // get unread notifications
    getUnreadNotificationsStart(state) {
      state.loading = true;
    },
    getUnreadNotificationsSuccess(state, action) {
      state.loading = false;
      state.unreadNotifications = action.payload;
    },
    getUnreadNotificationsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // get all notifications
    getAllNotificationsStart(state) {
      state.loading = true;
    },
    getAllNotificationsSuccess(state, action) {
      state.loading = false;
      state.allNotifications = action.payload.data;
    },
    getAllNotificationsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // read all notifications
    readAllNotificationsStart(state) {
      state.loading = true;
    },
    readAllNotificationsSuccess(state, action) {
      state.loading = false;
      state.allNotifications = action.payload.message;
    },
    readAllNotificationsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // delete notifications
    deleteNotificationStart(state) {
      state.loading = true;
    },
    deleteNotificationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteNotificationFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // clear error and message
    clearNotificationMessage(state) {
      state.message = null;
    },
    clearNotificationError(state) {
      state.error = null;
    },
  },
});

export const {
  getUnreadNotificationsStart,
  getUnreadNotificationsSuccess,
  getUnreadNotificationsFailure,
  getAllNotificationsStart,
  getAllNotificationsSuccess,
  getAllNotificationsFailure,
  readAllNotificationsStart,
  readAllNotificationsSuccess,
  readAllNotificationsFailure,
  deleteNotificationStart,
  deleteNotificationSuccess,
  deleteNotificationFailure,
  clearNotificationMessage,
  clearNotificationError,
} = notificaitionsSlice.actions;

export default notificaitionsSlice;
