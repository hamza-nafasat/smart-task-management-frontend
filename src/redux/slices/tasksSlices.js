import { createSlice } from "@reduxjs/toolkit/react";

const initialState = {
  tasks: [],
  singleTask: null,
  loading: false,
  error: null,
  message: null,
};

const tasksSlices = createSlice({
  initialState,
  name: "tasks",
  reducers: {
    // create  new task
    createNewTaskStart(state) {
      state.loading = true;
    },
    createNewTaskSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    createNewTaskFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // get single task
    getSingleTaskStart(state) {
      state.loading = true;
    },
    getSingleTaskSuccess(state, action) {
      state.loading = false;
      state.singleTask = action.payload.data;
      state.message = action.payload.message;
    },
    getSingleTaskFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // update single task
    updateSingleTaskStart(state) {
      state.loading = true;
    },
    updateSingleTaskSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateSingleTaskFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // delete single task
    deleteSingleTaskStart(state) {
      state.loading = true;
    },
    deleteSingleTaskSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteSingleTaskFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // get all tasks
    getAllTasksStart(state) {
      state.loading = true;
    },
    getAllTasksSuccess(state, action) {
      state.loading = false;
      state.tasks = action.payload.data;
      state.message = action.payload.message;
    },
    getAllTasksFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // clear error and message
    clearTaskError(state) {
      state.error = null;
    },
    clearTaskMessage(state) {
      state.message = null;
    },
  },
});

export const {
  // create  new task
  createNewTaskStart,
  createNewTaskSuccess,
  createNewTaskFailure,

  // get single task
  getSingleTaskStart,
  getSingleTaskSuccess,
  getSingleTaskFailure,

  // update single task
  updateSingleTaskStart,
  updateSingleTaskSuccess,
  updateSingleTaskFailure,

  // delete single task
  deleteSingleTaskStart,
  deleteSingleTaskSuccess,
  deleteSingleTaskFailure,

  // get all tasks
  getAllTasksStart,
  getAllTasksSuccess,
  getAllTasksFailure,

  // clear error and message
  clearTaskError,
  clearTaskMessage,
} = tasksSlices.actions;

export default tasksSlices;
