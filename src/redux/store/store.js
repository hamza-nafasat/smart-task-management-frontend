import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/usersSlices";
import tasksSlice from "../slices/tasksSlices";
import notificaitionsSlice from "../slices/notificationsSlices";

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [tasksSlice.name]: tasksSlice.reducer,
    [notificaitionsSlice.name]: notificaitionsSlice.reducer,
  },
});

export default store;
