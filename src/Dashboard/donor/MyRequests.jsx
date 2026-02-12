import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import LifeStreamLoader from "../../components/LifeStreamLoader";

const MyRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch Data with TanStack Query
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/donation-requests/my-requests");
      return res.data;
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/api/donation-requests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-requests"]);
      Swal.fire("Deleted!", "Request has been removed.", "success");
    },
  });

  // Status Change Mutation
  const statusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/api/donation-requests/status/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-requests"]);
      Swal.fire("Updated!", "Status changed successfully.", "success");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning";
      case "inprogress":
        return "badge-info";
      case "done":
        return "badge-success";
      case "canceled":
        return "badge-error text-white";
      default:
        return "badge-ghost";
    }
  };

  if (isLoading)
    return (
      <LifeStreamLoader></LifeStreamLoader>
    );

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-gray-800 tracking-tight">
          My Donation Requests
        </h2>
        <Link
          to="/dashboard/donor/create"
          className="btn btn-error text-white shadow-lg"
        >
          New Request
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50/50">
              <tr className="text-gray-500 uppercase text-[11px] tracking-wider">
                <th>Recipient</th>
                <th>Location</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th className="text-center">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td>
                    <div className="font-bold text-gray-800">
                      {req.recipientName}
                    </div>
                    <div className="badge badge-outline badge-xs opacity-60 font-bold">
                      {req.bloodGroup}
                    </div>
                  </td>
                  <td className="text-sm text-gray-600">
                    {req.recipientUpazila},{" "}
                    <span className="font-medium">{req.recipientDistrict}</span>
                  </td>
                  <td className="text-sm">
                    <div className="font-medium text-gray-700">
                      {req.donationDate}
                    </div>
                    <div className="text-xs text-gray-400">
                      {req.donationTime}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${getStatusClass(req.status)} badge-sm font-bold uppercase text-[9px] px-2 py-3`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-center items-center gap-1">
                      {/* Action: Done/Canceled only if inprogress */}
                      {req.status === "inprogress" && (
                        <div className="flex gap-1 mr-2">
                          <button
                            onClick={() =>
                              statusMutation.mutate({
                                id: req._id,
                                status: "done",
                              })
                            }
                            className="btn btn-ghost btn-xs text-success"
                            title="Mark as Done"
                          >
                            <FaCheckCircle size={18} />
                          </button>
                          <button
                            onClick={() =>
                              statusMutation.mutate({
                                id: req._id,
                                status: "canceled",
                              })
                            }
                            className="btn btn-ghost btn-xs text-error"
                            title="Cancel"
                          >
                            <FaTimesCircle size={18} />
                          </button>
                        </div>
                      )}

                      <Link
                        to={`/dashboard/donor/edit/${req._id}`}
                        className="btn btn-ghost btn-xs text-info"
                      >
                        <FaEdit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="btn btn-ghost btn-xs text-error"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                      <Link
                        to={`/donation-details/${req._id}`}
                        className="btn btn-ghost btn-xs text-primary"
                      >
                        <FaEye size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {requests.length === 0 && (
            <div className="text-center py-20 text-gray-400 font-medium">
              No requests found yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
