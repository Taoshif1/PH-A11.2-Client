import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaUsers,
  FaHandHoldingHeart,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Use TanStack Query exclusively for clean data fetching
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/admin-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-black mb-8 text-gray-800">
        Welcome Back, {user?.displayName || "Admin"}
      </h1>

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-6 text-gray-600">Admin Overview</h2>

        {/* Visual Stat Cards */}
        <div className="stats shadow-xl border w-full lg:w-2/3 bg-white rounded-3xl overflow-hidden">
          <div className="stat">
            <div className="stat-figure text-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title font-semibold text-gray-500">
              Total Funds
            </div>
            <div className="stat-value text-error text-4xl">
              ${stats.totalAmount || 0}
            </div>
            <div className="stat-desc font-medium text-gray-400">
              All-time donations
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title font-semibold text-gray-500">
              Payments
            </div>
            <div className="stat-value text-secondary text-4xl">
              {stats.totalDonations || 0}
            </div>
            <div className="stat-desc font-medium text-gray-400">
              Successful transactions
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="stats shadow bg-primary text-primary-content">
          <div className="stat">
            <div className="stat-figure text-3xl">
              <FaUsers />
            </div>
            <div className="stat-title text-primary-content opacity-70">
              Total Users
            </div>
            <div className="stat-value">{stats.users || 0}</div>
          </div>
        </div>

        {/* Total Blood Requests Card */}
        <div className="stats shadow bg-secondary text-secondary-content">
          <div className="stat">
            <div className="stat-figure text-3xl">
              <FaHandHoldingHeart />
            </div>
            <div className="stat-title text-secondary-content opacity-70">
              Requests
            </div>
            <div className="stat-value">{stats.bloodRequests || 0}</div>
          </div>
        </div>

        {/* Total Donors Card */}
        <div className="stats shadow bg-accent text-accent-content">
          <div className="stat">
            <div className="stat-figure text-3xl">
              <FaFileInvoiceDollar />
            </div>
            <div className="stat-title text-accent-content opacity-70">
              Total Donors
            </div>
            <div className="stat-value">{stats.totalDonors || 0}</div>
          </div>
        </div>
      </div>

      <div className="mt-10 p-10 bg-base-200 rounded-3xl text-center border-2 border-dashed border-base-300">
        <p className="text-xl italic font-serif">
          "With great power comes great responsibility."
        </p>
        <p className="mt-2 text-sm opacity-60">- Management Dashboard</p>
      </div>
    </div>
  );
};

export default AdminHome;
