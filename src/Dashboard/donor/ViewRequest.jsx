import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaHospital,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaEnvelope,
  FaTint,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const ViewRequest = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/api/requests/${id}`;
    axios
      .get(url)
      .then((res) => {
        setRequest(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg text-error"></span>
      </div>
    );
  if (!request)
    return (
      <div className="text-center py-20 font-bold">Request not found!</div>
    );

  const handleDonate = async () => {
    if (!user) {
      // Not logged in
      Swal.fire({
        title: "Login Required",
        text: "You must be logged in to donate blood.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    // Logged in: Show confirmation modal
    const { value: donorNote } = await Swal.fire({
      title: "Confirm Donation",
      input: "textarea",
      inputLabel: "Any message for the recipient?",
      inputPlaceholder: "Type your message here...",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "I am ready to donate!",
    });

    if (donorNote !== undefined) {
      try {
        const donationInfo = {
          donorName: user.displayName,
          donorEmail: user.email,
          donorNote: donorNote,
        };

        await axios.patch(
          `http://localhost:5000/api/donation-requests/donate/${id}`,
          donationInfo,
        );

        Swal.fire(
          "Success!",
          "You have committed to this donation.",
          "success",
        );
        navigate("/dashboard/donor/home");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="btn btn-ghost mb-6">
        ← Back to Search
      </button>

      <div className="bg-white rounded-3xl border shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-error p-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">{request.recipientName}</h1>
            <p className="flex items-center gap-2 mt-2 opacity-90">
              <FaMapMarkerAlt /> {request.recipientUpazila},{" "}
              {request.recipientDistrict}
            </p>
          </div>
          <div className="bg-white text-error w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-lg">
            <span className="text-2xl font-black">{request.bloodGroup}</span>
            <span className="text-[10px] uppercase font-bold">Group</span>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hospital & Time Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-b pb-2">Medical Details</h3>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 rounded-xl text-error">
                <FaHospital size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">
                  Hospital
                </p>
                <p className="font-semibold">{request.hospitalName}</p>
                <p className="text-sm text-gray-500">{request.fullAddress}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 rounded-xl text-error">
                <FaCalendarAlt size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">
                  Donation Date & Time
                </p>
                <p className="font-semibold">{request.donationDate}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaClock /> {request.donationTime}
                </p>
              </div>
            </div>
          </div>

          {/* Requester Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-b pb-2">
              Requester Contact
            </h3>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
                <FaUser size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">
                  Posted By
                </p>
                <p className="font-semibold">
                  {request.requesterName || "LifeStream Member"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
                <FaEnvelope size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">
                  Contact Email
                </p>
                <p className="font-semibold">
                  {request.requesterEmail || "Contact via Hospital"}
                </p>
              </div>
            </div>
          </div>

          {/* Message Box */}
          <div className="md:col-span-2 bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300">
            <h3 className="font-bold mb-2">Message from Requester:</h3>
            <p className="text-gray-700 italic">"{request.requestMessage}"</p>
          </div>
        </div>

        <div
          onClick={handleDonate}
          className="p-8 bg-gray-50 border-t flex justify-center"
        >
          <button className="btn btn-error text-white px-12 rounded-xl">
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewRequest;
