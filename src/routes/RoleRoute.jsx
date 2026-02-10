import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RoleRoute = ({ children, allowedRoles }) => {
  const { user, userInfo, loading } = useAuth();
  const location = useLocation();

  // 1. Wait for Firebase and MongoDB user data to load
  if (loading || !userInfo) {
    return <div className="min-h-screen flex items-center justify-center underline decoration-pink-500">Loading Role...</div>;
  }

  // 2. Check if the user's role is in the allowed list
  if (user && allowedRoles.includes(userInfo?.role)) {
    return children;
  }

  // 3. If not authorized, kick them out to the home or a "denied" page
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default RoleRoute;