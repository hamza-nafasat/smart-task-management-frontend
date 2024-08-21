import { lazy, Suspense, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Loader } from "./components/shared/loader/Loader";
import { getMyProfileAction } from "./redux/actions/usersActions";
import { clearUserError, clearUserMessage } from "./redux/slices/usersSlices";
import ProtectedRoute from "./utils/ProtectedRoute";
import "react-confirm-alert/src/react-confirm-alert.css";
import { socket, socketEvent } from "./utils/constants";
import { getUnreadNotificationsAction } from "./redux/actions/notificationsAction";
import { getUnreadNotificationsSuccess } from "./redux/slices/notificationsSlices";

const Login = lazy(() => import("./pages/auth/Login"));
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
const Reports = lazy(() => import("./pages/dashboard/reports/Reports"));
const UserDetails = lazy(() => import("./pages/dashboard/users/UserDetails"));
const FirstLoginChangePassword = lazy(() => import("./pages/auth/FirstLoginChangePassword"));

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, error, user } = useSelector((state) => state.users);

  useEffect(() => {
    socket.on("connect", () => {});

    socket.on(socketEvent.SEND_NOTIFICATION, (data) => {
      console.log("notifications received from server", data);
      dispatch(getUnreadNotificationsSuccess(data));
    });

    return () => {
      socket.off("connect");
      socket.off(socketEvent.SEND_NOTIFICATION);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMyProfileAction());
    dispatch(getUnreadNotificationsAction());
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
    if (user && user?.firstLogin) {
      return navigate("/dashboard/first-login-change-password");
    }
  }, [dispatch, error, message, navigate, user]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Routes for non-logged-in users */}
        <Route element={<ProtectedRoute onLoginPage={true} />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Routes for logged-in users */}
        <Route element={<ProtectedRoute onLoginPage={false} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="first-login-change-password" element={<FirstLoginChangePassword />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="tasks/:taskId" element={<DetailPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="users" element={<Users />} />
            <Route path="reports" element={<Reports />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="edit-user/:userId" element={<EditUser />} />
            <Route path="single-user/:userId" element={<UserDetails />} />
          </Route>
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </Suspense>
  );
}

export default App;
