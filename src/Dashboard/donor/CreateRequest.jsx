import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CreateRequest = () => {
  const { userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  // Load Geo Data
  useEffect(() => {
    const loadData = async () => {
      const distRes = await axios.get("/districts.json");
      const upzRes = await axios.get("/upazilas.json");

      const clean = (data) => data.find((item) => item.type === "table").data;

      setDistricts(clean(distRes.data));
      setUpazilas(clean(upzRes.data));
    };
    loadData();
  }, []);

  // Watch district selection to filter upazilas
  const selectedDistrictName = watch("recipientDistrict");

  useEffect(() => {
    if (selectedDistrictName) {
      const districtObj = districts.find(
        (d) => d.name === selectedDistrictName,
      );
      if (districtObj) {
        const filtered = upazilas.filter(
          (u) => u.district_id === districtObj.id,
        );
        setFilteredUpazilas(filtered);
      }
    }
  }, [selectedDistrictName, districts, upazilas]);

  const onSubmit = async (data) => {
    // Check if user is blocked (as per assignment requirements)
    if (userInfo?.status === "blocked") {
      return Swal.fire(
        "Access Denied",
        "Blocked users cannot create requests.",
        "error",
      );
    }

    const requestData = {
      ...data,
      requesterName: userInfo?.name,
      requesterEmail: userInfo?.email,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/api/donation-requests", requestData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Created!",
          text: "Your blood donation request is now live.",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard/donor/requests");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-base-200">
        <h2 className="text-3xl font-black text-error mb-8 flex items-center gap-3">
          <span className="text-4xl">🩸</span> Create Blood Request
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Read-Only Info */}
          <div className="form-control">
            <label className="label font-bold text-xs uppercase tracking-widest text-base-content/50">
              Requester Name
            </label>
            <input
              type="text"
              value={userInfo?.name || ""}
              readOnly
              className="input input-bordered bg-base-200 font-semibold"
            />
          </div>
          <div className="form-control">
            <label className="label font-bold text-xs uppercase tracking-widest text-base-content/50">
              Requester Email
            </label>
            <input
              type="text"
              value={userInfo?.email || ""}
              readOnly
              className="input input-bordered bg-base-200 font-semibold"
            />
          </div>

          <hr className="md:col-span-2 border-base-200 my-2" />

          {/* Recipient Details */}
          <div className="form-control">
            <label className="label font-bold">Recipient Name</label>
            <input
              {...register("recipientName", { required: true })}
              className="input input-bordered focus:border-error"
              placeholder="Who needs blood?"
            />
          </div>

          <div className="form-control">
            <label className="label font-bold">Blood Group</label>
            <select
              {...register("bloodGroup", { required: true })}
              className="select select-bordered focus:border-error"
            >
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* District Dropdown */}
          <div className="form-control">
            <label className="label font-bold">District</label>
            <select
              {...register("recipientDistrict", { required: true })}
              className="select select-bordered"
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila Dropdown */}
          <div className="form-control">
            <label className="label font-bold">Upazila</label>
            <select
              {...register("recipientUpazila", { required: true })}
              className="select select-bordered"
              disabled={!selectedDistrictName}
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control md:col-span-2">
            <label className="label font-bold">Hospital Name & Address</label>
            <textarea
              {...register("hospitalName", { required: true })}
              className="textarea textarea-bordered focus:border-error h-20"
              placeholder="Full address of the hospital..."
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label font-bold">Donation Date</label>
            <input
              type="date"
              {...register("donationDate", { required: true })}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label font-bold">Donation Time</label>
            <input
              type="time"
              {...register("donationTime", { required: true })}
              className="input input-bordered"
            />
          </div>

          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              className="btn btn-error w-full text-white text-lg shadow-lg hover:shadow-error/20"
            >
              Confirm Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
