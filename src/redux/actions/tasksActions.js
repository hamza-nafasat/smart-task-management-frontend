import { customAxios, customFormAxios } from "../../utils/customAxios";
import {
  addCommentFailure,
  addCommentReplyFailure,
  addCommentReplyStart,
  addCommentReplySuccess,
  addCommentStart,
  addCommentSuccess,
  createNewTaskFailure,
  createNewTaskStart,
  createNewTaskSuccess,
  deleteSingleTaskFailure,
  deleteSingleTaskStart,
  deleteSingleTaskSuccess,
  getAllTasksFailure,
  getAllTasksStart,
  getAllTasksSuccess,
  getCommentRepliesFailure,
  getCommentRepliesStart,
  getCommentRepliesSuccess,
  getSingleTaskCommentsFailure,
  getSingleTaskCommentsStart,
  getSingleTaskCommentsSuccess,
  getSingleTaskFailure,
  getSingleTaskStart,
  getSingleTaskSuccess,
  removeAttachmentFailure,
  removeAttachmentStart,
  removeAttachmentSuccess,
  updateSingleTaskFailure,
  updateSingleTaskStart,
  updateSingleTaskSuccess,
} from "../slices/tasksSlices";

// Create new Task Action
// ----------------------
const createNewTaskAction = (data) => async (dispatch) => {
  try {
    dispatch(createNewTaskStart());
    const response = await customFormAxios.post("/tasks/create", data);
    console.log("success while create new task", response);
    dispatch(createNewTaskSuccess(response.data));
  } catch (error) {
    console.log("error while create new task", error);
    dispatch(
      createNewTaskFailure(error?.response?.data?.message || "Some Error Occurred While Create New Task")
    );
  }
};

// get single task action
// ----------------------
const getSingleTaskAction = (id) => async (dispatch) => {
  try {
    dispatch(getSingleTaskStart());
    const response = await customAxios.get(`/tasks/single/${id}`);
    console.log("success while get single task", response);
    dispatch(getSingleTaskSuccess(response.data));
  } catch (error) {
    console.log("error while get single task", error);
    dispatch(
      getSingleTaskFailure(error?.response?.data?.message || "Some Error Occurred While Get Single Task")
    );
  }
};

// update single task action
// ----------------------
const updateSingleTaskAction = (id, data) => async (dispatch) => {
  try {
    dispatch(updateSingleTaskStart());
    const response = await customFormAxios.put(`/tasks/single/${id}`, data);
    console.log("success while update single task", response);
    dispatch(updateSingleTaskSuccess(response.data));
  } catch (error) {
    console.log("error while update single task", error);
    dispatch(
      updateSingleTaskFailure(
        error?.response?.data?.message || "Some Error Occurred While Update Single Task"
      )
    );
  }
};

// remove task attachment
// ----------------------
const removeAttachmentAction = (taskId, public_id) => async (dispatch) => {
  try {
    dispatch(removeAttachmentStart());
    const response = await customAxios.put(`/tasks/remove-attachment`, { taskId, public_id });
    console.log("success while remove task attachment", response);
    dispatch(removeAttachmentSuccess(response.data));
  } catch (error) {
    dispatch(
      removeAttachmentFailure(error?.response?.data?.message || "Some Error Occurred While Remove Attachment")
    );
    console.log("error while remove task attachment", error);
  }
};

// delete single task action
// ----------------------
const deleteSingleTaskAction = (id) => async (dispatch) => {
  try {
    dispatch(deleteSingleTaskStart());
    const response = await customAxios.delete(`/tasks/single/${id}`);
    dispatch(deleteSingleTaskSuccess(response.data));
    console.log("success while delete single task", response);
  } catch (error) {
    dispatch(
      deleteSingleTaskFailure(
        error?.response?.data?.message || "Some Error Occurred While Delete Single Task"
      )
    );
    console.log("error while delete single task", error);
  }
};

// get all tasks action
// ----------------------

const getAllTasksAction = () => async (dispatch) => {
  try {
    dispatch(getAllTasksStart());
    const response = await customAxios.get(`/tasks/all`);
    console.log("success while get all tasks", response);
    dispatch(getAllTasksSuccess(response.data));
  } catch (error) {
    console.log("error while get all tasks", error);
    dispatch(getAllTasksFailure(error?.response?.data?.message || "Some Error Occurred While Get All Tasks"));
  }
};

// get single task all notifications
// ---------------------------------
const getSingleTaskAllCommentsAction = (taskId) => async (dispatch) => {
  try {
    dispatch(getSingleTaskCommentsStart());
    const response = await customAxios.get(`/tasks/comments/all/${taskId}`);
    console.log("success while get single task", response);
    dispatch(getSingleTaskCommentsSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(
      getSingleTaskCommentsFailure(
        error?.response?.data?.message || "Some Error Occurred While Get Single Task"
      )
    );
    console.log("error while get single task", error);
  }
};

// add comment in task
// ----------------------
const addCommentAction = (taskId, content) => async (dispatch) => {
  try {
    dispatch(addCommentStart());
    const response = await customAxios.post("/tasks/add-comment/create", { taskId, content });
    console.log("success while add comment in task", response);
    dispatch(addCommentSuccess(response.data));
  } catch (error) {
    console.log("error while add comment in task", error);
    dispatch(
      addCommentFailure(error?.response?.data?.message || "Some Error Occurred While Add Comment In Task")
    );
  }
};

// get single comment replies
// ----------------------

const getCommentRepliesAction = (commentId) => async (dispatch) => {
  try {
    dispatch(getCommentRepliesStart());
    const response = await customAxios.get(`/tasks/replies/all/${commentId}`);
    console.log("success while get comment replies", response);
    dispatch(getCommentRepliesSuccess(response.data));
  } catch (error) {
    console.log("error while get comment replies", error);
    dispatch(
      getCommentRepliesFailure(
        error?.response?.data?.message || "Some Error Occurred While Get Comment Replies"
      )
    );
  }
};

// add comment reply
// ----------------------

const addCommentReplyAction = (commentId, content) => async (dispatch) => {
  try {
    dispatch(addCommentReplyStart());
    const response = await customAxios.post("/tasks/add-reply/create", { commentId, content });
    console.log("success while add comment reply", response);
    dispatch(addCommentReplySuccess(response.data));
  } catch (error) {
    console.log("error while add comment reply", error);
    dispatch(
      addCommentReplyFailure(error?.response?.data?.message || "Some Error Occurred While Add Comment Reply")
    );
  }
};

export {
  createNewTaskAction,
  getSingleTaskAction,
  updateSingleTaskAction,
  deleteSingleTaskAction,
  getAllTasksAction,
  getSingleTaskAllCommentsAction,
  removeAttachmentAction,
  addCommentAction,
  getCommentRepliesAction,
  addCommentReplyAction,
};
