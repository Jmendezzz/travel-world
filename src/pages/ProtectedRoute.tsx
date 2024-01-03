import { useAuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
function ProtectectedRoute() {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Outlet/> : <Navigate to={"/login"} />;
}
export default ProtectectedRoute;
