import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit, FaEye, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";

const VolunteerRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("all");

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["volunteer-requests", filter],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/volunteer/all-requests?status=${filter}`,
      );
      return res.data;
    },
  });

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(
        `/api/volunteer/update-status/${id}`,
        { status: newStatus },
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", `Request is now ${newStatus}`, "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Status update failed", "error");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black">Volunteer: Manage Requests</h2>
        <select
          className="select select-bordered select-sm"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-3xl border">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50">
              <th>Recipient</th>
              <th>Location</th>
              <th>Status</th>
              <th>Update Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.recipientName}</td>
                <td>
                  {req.upazila}, {req.district}
                </td>
                <td>
                  <span className="badge badge-outline capitalize">
                    {req.status}
                  </span>
                </td>
                <td>
                  <select
                    className="select select-xs select-ghost"
                    value={req.status}
                    onChange={(e) =>
                      handleStatusUpdate(req._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>
                <td className="space-x-2">
                  <Link
                    to={`/dashboard/donor/view/${req._id}`}
                    className="btn btn-ghost btn-xs text-info"
                  >
                    <FaEye />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteerRequests;
