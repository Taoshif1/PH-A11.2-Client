import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/users");
      return res.data;
    },
  });

  const handleUpdate = async (id, field, value) => {
    try {
      const res = await axiosSecure.patch(`/api/admin/users/${id}`, { [field]: value });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", `User ${field} is now ${value}.`, "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Action failed", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-black mb-6">User Management ({users.length})</h2>
      <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Avatar</th>
              <th>Name & Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user.image} alt="User" />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{user.name}</div>
                  <div className="text-sm opacity-50">{user.email}</div>
                </td>
                <td>
                  <span className={`badge badge-ghost font-semibold uppercase`}>{user.role}</span>
                </td>
                <td>
                  <span className={`badge ${user.status === 'blocked' ? 'badge-error' : 'badge-success'} text-white`}>
                    {user.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <div className="dropdown dropdown-left dropdown-end">
                    <label tabIndex={0} className="btn btn-xs btn-outline">Change Role</label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                      <li><button onClick={() => handleUpdate(user._id, 'role', 'admin')}>Admin</button></li>
                      <li><button onClick={() => handleUpdate(user._id, 'role', 'volunteer')}>Volunteer</button></li>
                      <li><button onClick={() => handleUpdate(user._id, 'role', 'donor')}>Donor</button></li>
                    </ul>
                  </div>
                  
                  {user.status === 'active' ? (
                    <button onClick={() => handleUpdate(user._id, 'status', 'blocked')} className="btn btn-xs btn-error text-white">Block</button>
                  ) : (
                    <button onClick={() => handleUpdate(user._id, 'status', 'active')} className="btn btn-xs btn-success text-white">Unblock</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;