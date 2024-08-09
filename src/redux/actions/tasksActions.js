import { customAxios } from "../../utils/customAxios";
import {
  createNewTaskFailure,
  createNewTaskStart,
  createNewTaskSuccess,
  deleteSingleTaskFailure,
  deleteSingleTaskStart,
  deleteSingleTaskSuccess,
  getAllTasksFailure,
  getAllTasksStart,
  getAllTasksSuccess,
  getSingleTaskFailure,
  getSingleTaskStart,
  getSingleTaskSuccess,
  updateSingleTaskFailure,
  updateSingleTaskStart,
  updateSingleTaskSuccess,
} from "../slices/tasksSlices";

// Create new Task Action
// ----------------------
const createNewTaskAction = (data) => async (dispatch) => {
  try {
    dispatch(createNewTaskStart());
    const response = await customAxios.post("/tasks/create", data);
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
    const response = await customAxios.put(`/tasks/single/${id}`, data);
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
    const response = await customAxios.get("/tasks/all");
    console.log("success while get all tasks", response);
    dispatch(getAllTasksSuccess(response.data));
  } catch (error) {
    console.log("error while get all tasks", error);
    dispatch(getAllTasksFailure(error?.response?.data?.message || "Some Error Occurred While Get All Tasks"));
  }
};

export {
  createNewTaskAction,
  getSingleTaskAction,
  updateSingleTaskAction,
  deleteSingleTaskAction,
  getAllTasksAction,
};
