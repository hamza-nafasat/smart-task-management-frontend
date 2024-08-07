import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePersistRoute = () => {
  const location = useLocation();
  const pathName = location.pathname;
  useEffect(() => {
    if (
      pathName === "/login" ||
      pathName === "/forget-password" ||
      pathName == "/dashboard" ||
      pathName == "/"
    ) {
      console.log("hello");
    } else if (pathName.startsWith("/reset-password")) {
      console.log("hello");
    } else {
      localStorage.setItem("lastVisitedRouteOfFleetMaster", pathName);
    }
  }, [pathName]);
};

export default usePersistRoute;
