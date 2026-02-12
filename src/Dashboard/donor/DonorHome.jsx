import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
// import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LifeStreamLoader from "../../components/LifeStreamLoader";

const DonorHome = () => {
  const { userInfo } = useAuth();
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure()
//   console.log(axiosSecure)

  useEffect(() => {
    const fetchRecentRequests = async () => {
      try {
        const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/api/donation-requests/recent?email=${userInfo.email}`);
        setRecentRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests", err.message);
      } finally {
        setLoading(false);
      }
    };
    if (userInfo?.email) fetchRecentRequests();
  }, [userInfo.email, axiosSecure]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/donation-requests/status/${id}`, { status: newStatus });
      setRecentRequests(prev => prev.map(req => req._id === id ? { ...req, status: newStatus } : req));
      Swal.fire("Updated!", `Status marked as ${newStatus}`, "success");
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/donation-requests/${id}`);
        setRecentRequests(prev => prev.filter(req => req._id !== id));
        Swal.fire("Deleted!", "Your request has been removed.", "success");
      }
    });
  };

  if (loading) return <LifeStreamLoader></LifeStreamLoader>;
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 p-8 rounded-2xl text-white shadow-lg">
        <h1 className="text-3xl font-bold">Welcome back, {userInfo?.name}! 👋</h1>
        <p className="mt-2 opacity-90">Manage your blood donation requests and save lives today.</p>
      </div>

      {/* Recent Requests Table */}
      {recentRequests.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your 3 Recent Requests</h2>
            <Link to="/dashboard/my-donation-requests" className="btn btn-outline btn-primary btn-sm">View All Requests</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date & Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50">
                    <td className="font-medium">{req.recipientName}</td>
                    <td className="text-sm">{req.recipientDistrict}, {req.recipientUpazila}</td>
                    <td className="text-sm">{req.donationDate} at {req.donationTime}</td>
                    <td><span className="badge badge-error text-white font-bold">{req.bloodGroup}</span></td>
                    <td>
                      <span className={`badge badge-sm font-semibold ${
                        req.status === 'pending' ? 'badge-warning' : 
                        req.status === 'inprogress' ? 'badge-info' : 
                        req.status === 'done' ? 'badge-success text-white' : 'badge-ghost'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="space-x-2">
                      {req.status === "inprogress" && (
                        <>
                          <button onClick={() => handleStatusUpdate(req._id, "done")} className="btn btn-xs btn-success text-white">Done</button>
                          <button onClick={() => handleStatusUpdate(req._id, "canceled")} className="btn btn-xs btn-error text-white">Cancel</button>
                        </>
                      )}
                      <Link to={`/dashboard/edit-request/${req._id}`} className="btn btn-ghost btn-xs text-blue-500"><FaEdit /></Link>
                      <button onClick={() => handleDelete(req._id)} className="btn btn-ghost btn-xs text-red-500"><FaTrashAlt /></button>
                      <Link to={`/donation-request/${req._id}`} className="btn btn-ghost btn-xs text-gray-500"><FaEye /></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorHome;