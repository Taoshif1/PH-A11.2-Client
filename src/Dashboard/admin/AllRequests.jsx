import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  FaTrash,
  FaEdit,
  FaEye,
  FaFilter,
  FaSortAmountDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();

  // States for filtering and sorting
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data: requests = [], refetch } = useQuery({
    // Adding status and sort to queryKey makes it auto-refetch when they change
    queryKey: ["all-requests-admin", statusFilter, sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/admin/all-requests?status=${statusFilter}&sort=${sortOrder}`,
      );
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/api/admin/requests/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Request has been removed.", "success");
            refetch();
          }
        } catch (err) {
          Swal.fire("Error", "Failed to delete request", "error");
        }
      }
    });
  };

  return (
    <div className="p-6">
      {/* HEADER SECTION: Title + Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800">
            All Blood Requests
          </h2>
          <p className="text-gray-500 text-sm">
            Manage and monitor all donation activities ({requests.length})
          </p>
        </div>

        {/* CONTROLS: Filter & Sort */}
        <div className="flex flex-wrap gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border shadow-sm">
            <FaFilter className="text-gray-400 text-xs" />
            <select
              className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border shadow-sm">
            <FaSortAmountDown className="text-gray-400 text-xs" />
            <select
              className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50/50 text-gray-600">
              <th className="py-4">Recipient</th>
              <th>Location</th>
              <th>Date & Time</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-20 text-gray-400">
                  No donation requests found for this selection.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4">
                    <div className="font-bold text-gray-800">
                      {req.recipientName}
                    </div>
                    <div className="text-xs opacity-60">{req.hospitalName}</div>
                  </td>
                  <td className="text-sm">
                    {req.district}, {req.upazila}
                  </td>
                  <td>
                    <div className="text-sm font-medium">
                      {req.donationDate}
                    </div>
                    <div className="text-xs text-primary font-bold">
                      {req.donationTime}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-error badge-md text-white font-bold px-3">
                      {req.bloodGroup}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`capitalize badge badge-outline font-bold text-[10px] px-2 py-3 ${
                        req.status === "pending"
                          ? "border-amber-400 text-amber-500"
                          : req.status === "inprogress"
                            ? "border-blue-400 text-blue-500"
                            : req.status === "done"
                              ? "border-green-400 text-green-500"
                              : "border-gray-400 text-gray-500"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-center gap-1">
                      <Link
                        to={`/dashboard/donor/view/${req._id}`}
                        className="btn btn-ghost btn-xs text-blue-500 hover:bg-blue-50"
                        title="View Details"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={`/dashboard/donor/edit/${req._id}`}
                        className="btn btn-ghost btn-xs text-amber-500 hover:bg-amber-50"
                        title="Edit Request"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="btn btn-ghost btn-xs text-red-500 hover:bg-red-50"
                        title="Delete Request"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
