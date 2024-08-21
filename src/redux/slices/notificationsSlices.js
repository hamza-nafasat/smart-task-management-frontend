import { createSlice } from "@reduxjs/toolkit/react";

const initialState = {
  unreadNotifications: [],
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
  },
});

export const { getUnreadNotificationsStart, getUnreadNotificationsSuccess, getUnreadNotificationsFailure } =
  notificaitionsSlice.actions;

export default notificaitionsSlice;
