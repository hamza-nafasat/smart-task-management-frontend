import { createSlice } from "@reduxjs/toolkit/react";

const initialState = {
  message: null,
  tasks: [],
  singleTask: null,
  singleTaskComments: [],
  singleCommentReplies: [],
  loading: false,
  error: null,
  taskActivities: [],
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

    // submit task
    submitTaskStart(state) {
      state.loading = true;
    },
    submitTaskSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    submitTaskFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // complete task
    completeTaskStart(state) {
      state.loading = true;
    },
    completeTaskSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    completeTaskFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // get task activities
    getTaskActivitiesStart(state) {
      state.loading = true;
    },
    getTaskActivitiesSuccess(state, action) {
      state.loading = false;
      state.taskActivities = action.payload.data;
    },
    getTaskActivitiesFailure(state, action) {
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

    // remove attachment
    removeAttachmentStart(state) {
      state.loading = true;
    },
    removeAttachmentSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    removeAttachmentFailure(state, action) {
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

    // get all comments of a task
    getSingleTaskCommentsStart(state) {
      state.loading = true;
    },
    getSingleTaskCommentsSuccess(state, action) {
      state.loading = false;
      state.singleTaskComments = action.payload.data;
    },
    getSingleTaskCommentsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // add comment in task
    addCommentStart(state) {
      state.loading = true;
    },
    addCommentSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    addCommentFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // get single comment replies
    getCommentRepliesStart(state) {
      state.loading = true;
    },
    getCommentRepliesSuccess(state, action) {
      state.loading = false;
      state.singleCommentReplies = action.payload.data;
    },
    getCommentRepliesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // add comment reply
    addCommentReplyStart(state) {
      state.loading = true;
    },
    addCommentReplySuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    addCommentReplyFailure(state, action) {
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

  // get single task activities
  getTaskActivitiesStart,
  getTaskActivitiesSuccess,
  getTaskActivitiesFailure,

  // update single task
  updateSingleTaskStart,
  updateSingleTaskSuccess,
  updateSingleTaskFailure,

  // submit task
  submitTaskStart,
  submitTaskSuccess,
  submitTaskFailure,

  // complete task
  completeTaskStart,
  completeTaskSuccess,
  completeTaskFailure,

  // delete single task
  deleteSingleTaskStart,
  deleteSingleTaskSuccess,
  deleteSingleTaskFailure,

  // remove attachment
  removeAttachmentStart,
  removeAttachmentSuccess,
  removeAttachmentFailure,

  // get all tasks
  getAllTasksStart,
  getAllTasksSuccess,
  getAllTasksFailure,

  // get all comments of a task
  getSingleTaskCommentsStart,
  getSingleTaskCommentsSuccess,
  getSingleTaskCommentsFailure,

  // add comment in task
  addCommentStart,
  addCommentSuccess,
  addCommentFailure,

  // get single comment replies
  getCommentRepliesStart,
  getCommentRepliesSuccess,
  getCommentRepliesFailure,

  // add comment reply
  addCommentReplyStart,
  addCommentReplySuccess,
  addCommentReplyFailure,

  // clear error and message
  clearTaskError,
  clearTaskMessage,
} = tasksSlices.actions;

export default tasksSlices;
