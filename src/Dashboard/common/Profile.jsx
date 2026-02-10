import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

const Profile = () => {
  const { userInfo, loading } = useAuth();
  const [isEditable, setIsEditable] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: userInfo, // Loads existing DB data into the form
  });

  if (loading) return <span className="loading loading-bars loading-lg"></span>;

  const onSubmit = async (data) => {
    try {
      // We only send the fields allowed to be updated
      const updatedData = {
        name: data.name,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        avatar: data.avatar,
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/users/update-profile`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      if (response.data.success) {
        Swal.fire("Success", "Profile updated successfully!", "success");
        setIsEditable(false);
        // Note: You might need to trigger a re-fetch in AuthContext to see changes
      }
    } catch (err) {
      Swal.fire("Error", "Could not update profile", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        {!isEditable ? (
          <button
            onClick={() => setIsEditable(true)}
            className="btn btn-primary btn-sm gap-2"
          >
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsEditable(false);
                reset();
              }}
              className="btn btn-ghost btn-sm text-red-500"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <div className="avatar mb-4">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={userInfo?.avatar} alt="User Avatar" />
            </div>
          </div>
          {isEditable && (
            <input
              type="text"
              {...register("avatar")}
              placeholder="Avatar URL"
              className="input input-bordered input-sm w-full max-w-xs"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="form-control">
            <label className="label font-semibold">Full Name</label>
            <input
              type="text"
              disabled={!isEditable}
              {...register("name")}
              className={`input input-bordered ${!isEditable && "bg-gray-50 text-gray-500"}`}
            />
          </div>

          {/* Email - Always Disabled */}
          <div className="form-control">
            <label className="label font-semibold">Email (Non-editable)</label>
            <input
              type="email"
              disabled
              value={userInfo?.email}
              className="input input-bordered bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Blood Group */}
          <div className="form-control">
            <label className="label font-semibold">Blood Group</label>
            <select
              disabled={!isEditable}
              {...register("bloodGroup")}
              className={`select select-bordered ${!isEditable && "bg-gray-50 text-gray-500"}`}
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label font-semibold">District</label>
            <input
              type="text"
              disabled={!isEditable}
              {...register("district")}
              className={`input input-bordered ${!isEditable && "bg-gray-50 text-gray-500"}`}
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Upazila</label>
            <input
              type="text"
              disabled={!isEditable}
              {...register("upazila")}
              className={`input input-bordered ${!isEditable && "bg-gray-50 text-gray-500"}`}
            />
          </div>
        </div>

        {isEditable && (
          <button
            type="submit"
            className="btn btn-success w-full text-white mt-4"
          >
            <FaSave /> Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
