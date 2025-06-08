import { Navigate } from "react-router-dom";

function ProtectedRouteHome({ element, isAllowed, redirectTo = "/" }) {
  return isAllowed ? element : <Navigate to={redirectTo} replace />;
}

export default ProtectedRouteHome;
