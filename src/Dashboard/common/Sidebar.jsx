import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaHome,
  FaPlusCircle,
  FaList,
  FaUsers,
  FaTasks,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { userInfo } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const role = userInfo?.role;

  return (
    <motion.div
      animate={{ width: isCollapsed ? "80px" : "280px" }}
      className="relative min-h-screen bg-base-100 shadow-2xl flex flex-col transition-all duration-300 border-r border-base-300"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-error text-white p-1.5 rounded-full shadow-md hover:scale-110 transition-transform z-50"
      >
        {isCollapsed ? (
          <FaChevronRight size={12} />
        ) : (
          <FaChevronLeft size={12} />
        )}
      </button>

      {/* Brand Logo */}
      <div
        className={`p-6 mb-4 border-b border-base-200 ${isCollapsed ? "text-center px-2" : ""}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🩸</span>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-black tracking-tighter text-error"
            >
              LifeStream
            </motion.span>
          )}
        </div>
        {!isCollapsed && (
          <p className="text-[10px] font-bold text-base-content/40 mt-1 uppercase tracking-[0.2em]">
            {role || "User"} Portal
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-3">
        <NavItem
          to="/dashboard/profile"
          icon={<FaUser />}
          label="Profile"
          collapsed={isCollapsed}
        />

        {role === "donor" && (
          <>
            <NavItem
              to="/dashboard/donor/home"
              icon={<FaHome />}
              label="Dashboard"
              collapsed={isCollapsed}
            />
            <NavItem
              to="/dashboard/donor/requests"
              icon={<FaList />}
              label="My Requests"
              collapsed={isCollapsed}
            />
            <NavItem
              to="/dashboard/donor/create"
              icon={<FaPlusCircle />}
              label="Create Request"
              collapsed={isCollapsed}
            />
          </>
        )}

        {role === "admin" && (
          <>
            <NavItem
              to="/dashboard/admin/home"
              icon={<FaHome />}
              label="Stats"
              collapsed={isCollapsed}
            />
            <NavItem
              to="/dashboard/admin/users"
              icon={<FaUsers />}
              label="Users"
              collapsed={isCollapsed}
            />
            <NavItem
              to="/dashboard/admin/requests"
              icon={<FaTasks />}
              label="All Requests"
              collapsed={isCollapsed}
            />
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-base-200">
        <NavItem
          to="/"
          icon={<FaHome />}
          label="Main Site"
          collapsed={isCollapsed}
        />
      </div>
    </motion.div>
  );
};

// Helper Component for cleaner code
const NavItem = ({ to, icon, label, collapsed }) => {
  return (
    <NavLink
      to={to}
      end={
        to.endsWith("dashboard") ||
        to.endsWith("admin") ||
        to.endsWith("volunteer")
      }
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
          isActive
            ? "bg-error text-white shadow-md"
            : "hover:bg-error/5 text-base-content/60"
        } ${collapsed ? "justify-center" : ""}`
      }
    >
      <span className="text-lg min-w-[20px]">{icon}</span>
      {!collapsed && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-medium whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}
      {collapsed && (
        <div className="absolute left-20 bg-neutral text-neutral-content px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
          {label}
        </div>
      )}
    </NavLink>
  );
};

export default Sidebar;
