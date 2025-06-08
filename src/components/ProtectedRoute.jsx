import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, isAllowed, redirectTo = "/login" }) {
  return isAllowed ? element : <Navigate to={redirectTo} replace />;
}

export default ProtectedRoute;
