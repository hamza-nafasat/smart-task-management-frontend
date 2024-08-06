import react, { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
const Login = lazy(() => import("./pages/auth/Login"));
const Home = lazy(() => import("./pages/dashboard/home/Home"));
const Dashboard = lazy(() => import("./pages/dashboard/index"));
const Notifications = lazy(() => import("./pages/dashboard/notifications/Notifications"));
const Tasks = lazy(() => import("./pages/dashboard/tasks/Tasks"));
const DetailPage = lazy(() => import("./components/shared/tasks/TaskDetail"));
const Profile = lazy(() => import("./pages/dashboard/profile/Profile"));
const ChangePassword = lazy(() => import("./pages/auth/ChangePassword"));
const ForgetPassword = lazy(() => import("./pages/auth/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const Users = lazy(() => import("./pages/dashboard/users/Users"));
const AddUser = lazy(() => import("./pages/dashboard/users/AddUser"));
const EditUser = lazy(() => import("./pages/dashboard/users/EditUser"));
import { Loader } from "./components/shared/loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearUserError, clearUserMessage } from "./redux/slices/usersSlices";
import { getMyProfileAction } from "./redux/actions/usersActions";

function App() {
  const dispatch = useDispatch();
  const { user, message, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getMyProfileAction());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearUserMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearUserError());
    }
  }, [dispatch, error, message]);
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="notifications" element={<Notifications />} />
            <Route path="task-details" element={<DetailPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="users" element={<Users />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="edit-user" element={<EditUser />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="top-right" reverseOrder={false} />
    </Router>
  );
}

export default App;
