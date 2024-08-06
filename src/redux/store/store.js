import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/usersSlices";

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
  },
});

export default store;
