import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUsers, FaHandHoldingHeart, FaFileInvoiceDollar } from "react-icons/fa";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/admin-stats");
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-black mb-8">Welcome Back, {user?.displayName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="stats shadow bg-primary text-primary-content">
          <div className="stat">
            <div className="stat-figure text-3xl"><FaUsers /></div>
            <div className="stat-title text-primary-content opacity-70">Total Users</div>
            <div className="stat-value">{stats.users || 0}</div>
          </div>
        </div>

        {/* Total Blood Requests Card */}
        <div className="stats shadow bg-secondary text-secondary-content">
          <div className="stat">
            <div className="stat-figure text-3xl"><FaHandHoldingHeart /></div>
            <div className="stat-title text-secondary-content opacity-70">Requests</div>
            <div className="stat-value">{stats.bloodRequests || 0}</div>
          </div>
        </div>

        {/* Example placeholder for other stats */}
        <div className="stats shadow bg-accent text-accent-content">
          <div className="stat">
            <div className="stat-figure text-3xl"><FaFileInvoiceDollar /></div>
            <div className="stat-title text-accent-content opacity-70">Total Donors</div>
            <div className="stat-value">{stats.totalDonors || 0}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-10 p-10 bg-base-200 rounded-3xl text-center">
        <p className="text-xl italic">"With great power comes great responsibility."</p>
        <p className="mt-2 text-sm opacity-60">- Management Dashboard</p>
      </div>
    </div>
  );
};

export default AdminHome;