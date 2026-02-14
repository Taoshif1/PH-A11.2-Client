import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetching paginated users
  const {
    data: userData = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/admin/users?page=${currentPage}&limit=${itemsPerPage}`,
      );
      return res.data; // Server returns { result, totalUsers, totalPages }
    },
  });

  // Safe extraction to prevent ".map is not a function" crash
  const users = userData.result || [];
  const totalPages = userData.totalPages || 1;
  const totalUsers = userData.totalUsers || 0;

  const handleUpdate = async (id, field, value) => {
    try {
      const res = await axiosSecure.patch(`/api/admin/users/${id}`, {
        [field]: value,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", `User ${field} is now ${value}.`, "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Action failed", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-bars loading-lg text-error"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-gray-800">User Management</h2>
          <p className="text-gray-500">
            Total registered members:{" "}
            <span className="badge badge-outline">{totalUsers}</span>
          </p>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50/50 text-gray-600">
              <th className="py-4">Avatar</th>
              <th>Name & Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.image || "https://i.ibb.co/placeholder.jpg"}
                          alt="User"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold text-gray-800">{user.name}</div>
                    <div className="text-xs opacity-60 font-medium">
                      {user.email}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost font-bold text-[10px] uppercase px-2">
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge badge-sm text-white font-bold ${
                        user.status === "blocked"
                          ? "badge-error"
                          : "badge-success"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="flex justify-center gap-2 py-4">
                    {/* Role Dropdown */}
                    <div className="dropdown dropdown-left dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-xs btn-outline btn-info"
                      >
                        Role
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-2xl w-32 border"
                      >
                        <li className="menu-title text-[10px]">Change to:</li>
                        <li>
                          <button
                            className="text-xs"
                            onClick={() =>
                              handleUpdate(user._id, "role", "admin")
                            }
                          >
                            Admin
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-xs"
                            onClick={() =>
                              handleUpdate(user._id, "role", "volunteer")
                            }
                          >
                            Volunteer
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-xs"
                            onClick={() =>
                              handleUpdate(user._id, "role", "donor")
                            }
                          >
                            Donor
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Block/Unblock Button */}
                    {user.status === "active" ? (
                      <button
                        onClick={() =>
                          handleUpdate(user._id, "status", "blocked")
                        }
                        className="btn btn-xs btn-error text-white"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleUpdate(user._id, "status", "active")
                        }
                        className="btn btn-xs btn-success text-white"
                      >
                        Unblock
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION UI */}
      <div className="flex flex-col items-center mt-10 gap-2">
        <div className="join bg-white border shadow-sm">
          <button
            className="join-item btn btn-sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            «
          </button>

          {[...Array(totalPages).keys()].map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => setCurrentPage(pageIndex + 1)}
              className={`join-item btn btn-sm ${
                currentPage === pageIndex + 1 ? "btn-error text-white" : ""
              }`}
            >
              {pageIndex + 1}
            </button>
          ))}

          <button
            className="join-item btn btn-sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
        <p className="text-xs text-gray-400 font-medium">
          Showing page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default AllUsers;
