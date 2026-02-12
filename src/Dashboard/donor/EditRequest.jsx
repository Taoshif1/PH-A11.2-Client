import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";

const EditRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, watch } = useForm();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // 1. Fetch existing request data
  const { data: request, isLoading } = useQuery({
    queryKey: ["request", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/donation-requests/${id}`);
      return res.data;
    },
  });

  // 2. Load Geo Data
  useEffect(() => {
    axios
      .get("/districts.json")
      .then((res) =>
        setDistricts(res.data.find((i) => i.type === "table").data),
      );
    axios
      .get("/upazilas.json")
      .then((res) =>
        setUpazilas(res.data.find((i) => i.type === "table").data),
      );
  }, []);

  // 3. Pre-fill form when data is ready
  useEffect(() => {
    if (request) reset(request);
  }, [request, reset]);

  const onSubmit = async (data) => {
    const { _id, ...updatedData } = data; // remove ID from body
    try {
      const res = await axiosSecure.put(
        `/api/donation-requests/${id}`,
        updatedData,
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Request details saved.", "success");
        navigate("/dashboard/donor/requests");
      }
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-black mb-6">Edit Blood Request</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="form-control">
            <label className="label">Recipient Name</label>
            <input
              {...register("recipientName")}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Blood Group</label>
            <select
              {...register("bloodGroup")}
              className="select select-bordered"
            >
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          {/*other fields*/}
          <div className="form-control">
            <label className="label">District</label>
            <select
              {...register("recipientDistrict")}
              className="select select-bordered"
            >
              {districts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">Upazila</label>
            <select
              {...register("recipientUpazila")}
              className="select select-bordered"
            >
              {upazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">Hospital Name</label>
            <input
              {...register("hospitalName")}
              className="input input-bordered"
              placeholder="e.g. Dhaka Medical"
            />
          </div>

          <div className="form-control">
            <label className="label">Full Address</label>
            <input
              {...register("fullAddress")}
              className="input input-bordered"
              placeholder="House/Road No"
            />
          </div>

          <div className="form-control">
            <label className="label">Donation Date</label>
            <input
              type="date"
              {...register("donationDate")}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">Donation Time</label>
            <input
              type="time"
              {...register("donationTime")}
              className="input input-bordered"
            />
          </div>

          <div className="form-control md:col-span-2">
            <label className="label">
              Why do you need blood? (Short Message)
            </label>
            <textarea
              {...register("requestMessage")}
              className="textarea textarea-bordered h-24"
            ></textarea>
          </div>
          <div className="md:col-span-2 mt-4">
            <button type="submit" className="btn btn-error w-full text-white">
              Update Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRequest;
