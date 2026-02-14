import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaTint,
  FaHospital,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router";

const FindDonors = () => {
  const [requests, setRequests] = useState([]); // Renamed from donors to requests for clarity
  const [loading, setLoading] = useState(false);

  // Location Data States
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const [searchParams, setSearchParams] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  // Load local JSON data with correct indexing for your file structure
  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((json) => {
        const data = json.find((item) => item.name === "districts")?.data || [];
        setDistricts(data);
      });

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((json) => {
        const data = json.find((item) => item.name === "upazilas")?.data || [];
        setUpazilas(data);
      });
  }, []);

  // Filter upazilas when district changes
  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    const districtObj = districts.find((d) => d.name === districtName);

    setSearchParams({ ...searchParams, district: districtName, upazila: "" });

    if (districtObj) {
      const filtered = upazilas.filter((u) => u.district_id === districtObj.id);
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { bloodGroup, district, upazila } = searchParams;
      const res = await axios.get(
        `http://localhost:5000/api/users/donors/search?bloodGroup=${encodeURIComponent(bloodGroup)}&district=${district}&upazila=${upazila}`,
      );
      setRequests(res.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black mb-2">
          Find <span className="text-error">Blood Requests</span>
        </h1>
        <p className="text-gray-500">
          Search for urgent blood requirements near you
        </p>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-8 rounded-3xl border shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-12"
      >
        <div className="form-control w-full">
          <label className="label font-bold text-xs uppercase text-gray-400">
            Blood Group
          </label>
          <select
            required
            className="select select-bordered w-full"
            onChange={(e) =>
              setSearchParams({ ...searchParams, bloodGroup: e.target.value })
            }
          >
            <option value="">Select Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control w-full">
          <label className="label font-bold text-xs uppercase text-gray-400">
            District
          </label>
          <select
            required
            className="select select-bordered w-full"
            onChange={handleDistrictChange}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={`dist-${d.id}`} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control w-full">
          <label className="label font-bold text-xs uppercase text-gray-400">
            Upazila
          </label>
          <select
            required
            className="select select-bordered w-full"
            value={searchParams.upazila}
            onChange={(e) =>
              setSearchParams({ ...searchParams, upazila: e.target.value })
            }
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={`upz-${u.id}`} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-error text-white w-full rounded-xl"
        >
          <FaSearch /> Search
        </button>
      </form>

      {/* Results Section */}
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-dots loading-lg text-error"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div
                key={request._id}
                className="card bg-white border rounded-3xl hover:shadow-md transition-all border-b-4 border-b-error"
              >
                <div className="card-body p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="badge badge-error gap-1 text-white font-bold p-4">
                      <FaTint /> {request.bloodGroup}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">
                        Status
                      </p>
                      <span className="badge badge-ghost badge-sm capitalize">
                        {request.status}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl font-black text-gray-800">
                    {request.recipientName}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-error" />{" "}
                    {request.recipientUpazila}, {request.recipientDistrict}
                  </p>

                  <div className="space-y-3 bg-gray-50 p-4 rounded-2xl text-sm border border-dashed border-gray-300">
                    <p className="flex items-center gap-2">
                      <FaHospital className="text-gray-400" />
                      <span>
                        <strong>Hospital:</strong> {request.hospitalName}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>
                        <strong>Needed:</strong> {request.donationDate} at{" "}
                        {request.donationTime}
                      </span>
                    </p>
                  </div>

                  <div className="card-actions mt-6">
                    <Link
                      to={`/request-details/${request._id}`}
                      className="btn btn-error btn-block text-white rounded-xl shadow-lg shadow-red-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 opacity-40">
              <FaSearch className="text-6xl mx-auto mb-4" />
              <p className="text-xl font-bold">No blood requests found.</p>
              <p>Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FindDonors;
