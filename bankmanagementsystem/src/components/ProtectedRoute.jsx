import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";

export default function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/user"} replace />;
  }

  return children;
}