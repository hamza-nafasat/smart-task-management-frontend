/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, onLoginPage = false }) => {
  const isAuthenticated = useAuth();
  if (onLoginPage) {
    const lastVisitedRoute = localStorage.getItem("lastVisitedRouteOfFleetMaster") || "/dashboard";
    if (isAuthenticated) return <Navigate to={lastVisitedRoute} replace />;
  }

  if (!onLoginPage) {
    if (!isAuthenticated) return <Navigate to={"/login"} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
