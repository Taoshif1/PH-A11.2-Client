import { NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { userInfo } = useAuth(); // from DB
  const role = userInfo?.role;

  return (
    <aside className="w-64 bg-white shadow-lg hidden md:block">

      <div className="p-6 font-bold text-xl">
        🩸 Life<span className="text-pink-600">Stream </span>
      </div>

      <nav className="space-y-2 px-4">

        <NavLink to="/dashboard/profile">Profile</NavLink>

        {role === "donor" && (
          <>
            <NavLink to="/dashboard/donor">Dashboard</NavLink>
            <NavLink to="/dashboard/donor/requests">My Requests</NavLink>
            <NavLink to="/dashboard/donor/create">Create Request</NavLink>
          </>
        )}

        {role === "admin" && (
          <>
            <NavLink to="/dashboard/admin">Dashboard</NavLink>
            <NavLink to="/dashboard/admin/users">All Users</NavLink>
            <NavLink to="/dashboard/admin/requests">All Requests</NavLink>
          </>
        )}

        {role === "volunteer" && (
          <>
            <NavLink to="/dashboard/volunteer">Dashboard</NavLink>
            <NavLink to="/dashboard/volunteer/requests">Requests</NavLink>
          </>
        )}

      </nav>
    </aside>
  );
};

export default Sidebar;
