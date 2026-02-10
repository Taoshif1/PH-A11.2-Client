import { Outlet } from "react-router";
import Sidebar from "../Dashboard/common/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <Sidebar></Sidebar>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;
