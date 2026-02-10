import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FaUser, FaHome, FaPlusCircle, FaList, FaUsers, FaTasks } from "react-icons/fa";

const Sidebar = () => {
  const { userInfo } = useAuth();
  const role = userInfo?.role;

  const linkClass = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive ? "bg-primary text-white shadow-md" : "hover:bg-pink-50 text-gray-700"
    }`;

  return (
    <div className="w-64 min-h-screen bg-white shadow-xl flex flex-col p-4">
      <div className="p-4 mb-6 border-b">
        <h1 className="text-xl font-bold flex items-center gap-2">
          🩸 <span className="text-pink-600">LifeStream</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{role} Portal</p>
      </div>

      <nav className="flex-1 space-y-2">
        {/* Common for all roles */}
        <NavLink to="/dashboard/profile" className={linkClass}>
          <FaUser /> Profile
        </NavLink>

        {/* Role Specific */}
        {role === "donor" && (
          <>
            <NavLink to="/dashboard/donor" end className={linkClass}>
              <FaHome /> Dashboard Home
            </NavLink>
            <NavLink to="/dashboard/donor/requests" className={linkClass}>
              <FaList /> My Requests
            </NavLink>
            <NavLink to="/dashboard/donor/create" className={linkClass}>
              <FaPlusCircle /> Create Request
            </NavLink>
          </>
        )}

        {role === "admin" && (
          <>
            <NavLink to="/dashboard/admin" end className={linkClass}>
              <FaHome /> Admin Stats
            </NavLink>
            <NavLink to="/dashboard/admin/users" className={linkClass}>
              <FaUsers /> Manage Users
            </NavLink>
            <NavLink to="/dashboard/admin/requests" className={linkClass}>
              <FaTasks /> All Blood Requests
            </NavLink>
          </>
        )}

        {role === "volunteer" && (
          <>
            <NavLink to="/dashboard/volunteer" end className={linkClass}>
              <FaHome /> Volunteer Home
            </NavLink>
            <NavLink to="/dashboard/volunteer/requests" className={linkClass}>
              <FaTasks /> Manage Requests
            </NavLink>
          </>
        )}
      </nav>

      <div className="border-t pt-4">
        <NavLink to="/" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-primary transition-colors">
          <FaHome /> Back to Website
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;