import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaHeartbeat, FaClipboardList, FaCheckCircle } from "react-icons/fa";

const VolunteerHome = () => {
  const { userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch quick stats for the volunteer
  const { data: stats = {} } = useQuery({
    queryKey: ["volunteer-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/volunteer/all-requests");
      const data = res.data;
      return {
        total: data.length,
        pending: data.filter((r) => r.status === "pending").length,
        done: data.filter((r) => r.status === "done").length,
      };
    },
  });

  return (
    <div className="p-8 space-y-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row items-center gap-6 bg-white p-8 rounded-3xl border shadow-sm"
      >
        <div className="avatar online">
          <div className="w-24 rounded-full ring ring-error ring-offset-2">
            <img
              src={userInfo?.avatar || "https://i.ibb.co/placeholder.jpg"}
              alt="Volunteer"
            />
          </div>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-black">
            Welcome back, <span className="text-error">{userInfo?.name}</span>!
          </h1>
          <p className="text-gray-500 italic">
            "Service to others is the rent you pay for your room here on earth."
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<FaClipboardList />}
          title="Total Requests"
          value={stats.total || 0}
          color="text-blue-500"
        />
        <StatCard
          icon={<FaHeartbeat />}
          title="Pending Help"
          value={stats.pending || 0}
          color="text-error"
        />
        <StatCard
          icon={<FaCheckCircle />}
          title="Completed"
          value={stats.done || 0}
          color="text-success"
        />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className="p-6 bg-white rounded-3xl border shadow-sm flex items-center gap-4">
    <div className={`p-4 rounded-2xl bg-gray-50 ${color} text-2xl`}>{icon}</div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
        {title}
      </p>
      <p className="text-2xl font-black">{value}</p>
    </div>
  </div>
);

export default VolunteerHome;
