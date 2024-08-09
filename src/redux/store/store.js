import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/usersSlices";
import tasksSlice from "../slices/tasksSlices";

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [tasksSlice.name]: tasksSlice.reducer,
  },
});

export default store;
