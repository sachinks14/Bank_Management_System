import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const homeLink = user?.role === "admin" ? "/admin" : "/user";

  return (
    <nav className="bg-midnight-800 border-b border-midnight-600 px-6 py-4 flex justify-between items-center">
      <Link to={homeLink} className="text-emerald-light font-bold text-lg">
        Bank Management System
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-gray-300 text-sm">
          Hi, {user?.fullName || "User"} ({user?.role})
        </span>
        <button onClick={handleLogout} className="btn-danger text-sm">
          Logout
        </button>
      </div>
    </nav>
  );
}
