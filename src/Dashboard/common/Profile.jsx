import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import LifeStreamLoader from "../../components/LifeStreamLoader";

const Profile = () => {
  const { userInfo, loading, setUserInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditable, setIsEditable] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userInfo) {
      reset(userInfo);
    }
  }, [userInfo, reset]);

  if (loading) return <LifeStreamLoader />;

  const onSubmit = async (data) => {
    console.log("Submit button clicked, data:", data); // Check if this fires
    try {
      const updatedData = {
        name: data.name,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        avatar: data.avatar,
      };

      const response = await axiosSecure.patch(
        `/api/users/update-profile`,
        updatedData,
      );

      if (response.data.success || response.data.result?.acknowledged) {
        Swal.fire("Success", "Profile updated successfully!", "success");
        setIsEditable(false);

        // Update local context
        if (setUserInfo) {
          // If backend sends 'data', use it. Otherwise, merge local data.
          const updatedUser = response.data.data || {
            ...userInfo,
            ...updatedData,
          };
          setUserInfo(updatedUser);
        }
      }
    } catch (err) {
      console.error("Update Error:", err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Could not update profile",
        "error",
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        {!isEditable ? (
          <button
            type="button" // Always specify type="button" to prevent accidental submits
            onClick={() => setIsEditable(true)}
            className="btn btn-primary btn-sm gap-2"
          >
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setIsEditable(false);
              reset(userInfo); // Reset to original data
            }}
            className="btn btn-ghost btn-sm text-red-500"
          >
            <FaTimes /> Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="avatar mb-4">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={userInfo?.avatar || "https://via.placeholder.com/150"}
                alt="Avatar"
              />
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
              readOnly={!isEditable} // Changed from disabled to readOnly
              {...register("name", { required: true })}
              className={`input input-bordered ${!isEditable ? "bg-gray-50 text-gray-500" : "focus:border-primary"}`}
            />
          </div>

          {/* Email - Always Read Only */}
          <div className="form-control">
            <label className="label font-semibold">Email (Fixed)</label>
            <input
              type="email"
              readOnly
              value={userInfo?.email || ""}
              className="input input-bordered bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Blood Group */}
          <div className="form-control">
            <label className="label font-semibold">Blood Group</label>
            <select
              disabled={!isEditable} // Selects still need 'disabled'
              {...register("bloodGroup")}
              className={`select select-bordered ${!isEditable && "bg-gray-50 text-gray-500"}`}
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

          {/* District */}
          <div className="form-control">
            <label className="label font-semibold">District</label>
            <input
              type="text"
              readOnly={!isEditable}
              {...register("district")}
              className={`input input-bordered ${!isEditable && "bg-gray-50 text-gray-500"}`}
            />
          </div>

          {/* Upazila */}
          <div className="form-control">
            <label className="label font-semibold">Upazila</label>
            <input
              type="text"
              readOnly={!isEditable}
              {...register("upazila")}
              className={`input input-bordered ${!isEditable && "bg-gray-50 text-gray-500"}`}
            />
          </div>
        </div>

        {isEditable && (
          <button
            type="submit" // Ensure this is "submit"
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
