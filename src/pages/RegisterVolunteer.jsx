import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useMemo, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterVolunteer = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { divisions, districts, upazilas, unions } = useLoaderData();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      divisionId: "",
      districtId: "",
      upazilaId: "",
      unionId: "",
    },
  });

  const selectedDivision = watch("divisionId");
  const selectedDistrict = watch("districtId");
  const selectedUpazila = watch("upazilaId");

  // Reset child selects when parent changes
  useEffect(() => {
    setValue("districtId", "");
  }, [selectedDivision, setValue]);

  useEffect(() => {
    setValue("upazilaId", "");
  }, [selectedDistrict, setValue]);

  useEffect(() => {
    setValue("unionId", "");
  }, [selectedUpazila, setValue]);

  // Filtered options
  const filteredDistricts = useMemo(
    () => districts.filter((d) => d.division_id === selectedDivision),
    [selectedDivision, districts],
  );

  const filteredUpazilas = useMemo(
    () => upazilas.filter((u) => u.district_id === selectedDistrict),
    [selectedDistrict, upazilas],
  );

  const filteredUnions = useMemo(
    () => unions.filter((un) => un.upazilla_id === selectedUpazila),
    [selectedUpazila, unions],
  );

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data.email, data.password);

      await updateUserProfile(data.name, "");

      const volunteerInfo = {
        uid: result.user.uid,
        name: data.name,
        email: data.email,
        bloodGroup: data.bloodGroup,
        phone: data.phone,
        division: divisions.find((d) => d.id === data.divisionId)?.name,
        district: districts.find((d) => d.id === data.districtId)?.name,
        upazila: upazilas.find((u) => u.id === data.upazilaId)?.name,
        union: unions.find((un) => un.id === data.unionId)?.name,
        role: "volunteer",
        status: "active",
        createdAt: new Date(),
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register-volunteer`,
        volunteerInfo,
      );

      Swal.fire(
        "Success!",
        "Volunteer account created successfully.",
        "success",
      );
      navigate("/dashboard/volunteer/home");
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        error.message || "Registration failed. Try again.",
        "error",
      );
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h2 className="text-3xl font-bold text-error text-center mb-2">
            Join Volunteer Team
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Register to become a volunteer and help save lives.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your full name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-error text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="you@example.com"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-error text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="••••••"
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-error text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Blood Group */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Blood Group</span>
              </label>
              <select
                {...register("bloodGroup", {
                  required: "Blood group is required",
                })}
                className="select select-bordered"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              {errors.bloodGroup && (
                <span className="text-error text-xs mt-1">
                  {errors.bloodGroup.message}
                </span>
              )}
            </div>
          </div>

          <div className="divider">Address Details</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Division */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Division</span>
              </label>
              <select
                {...register("divisionId", {
                  required: "Division is required",
                })}
                className="select select-bordered"
              >
                <option value="">Select Division</option>
                {divisions.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name} ({div.bn_name})
                  </option>
                ))}
              </select>
              {errors.divisionId && (
                <span className="text-error text-xs mt-1">
                  {errors.divisionId.message}
                </span>
              )}
            </div>

            {/* District */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">District</span>
              </label>
              <select
                {...register("districtId", {
                  required: "District is required",
                })}
                className="select select-bordered"
                disabled={!selectedDivision}
              >
                <option value="">Select District</option>
                {filteredDistricts.map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {dist.name}
                  </option>
                ))}
              </select>
              {errors.districtId && (
                <span className="text-error text-xs mt-1">
                  {errors.districtId.message}
                </span>
              )}
            </div>

            {/* Upazila */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Upazila</span>
              </label>
              <select
                {...register("upazilaId", { required: "Upazila is required" })}
                className="select select-bordered"
                disabled={!selectedDistrict}
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((upz) => (
                  <option key={upz.id} value={upz.id}>
                    {upz.name}
                  </option>
                ))}
              </select>
              {errors.upazilaId && (
                <span className="text-error text-xs mt-1">
                  {errors.upazilaId.message}
                </span>
              )}
            </div>

            {/* Union */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Union</span>
              </label>
              <select
                {...register("unionId", { required: "Union is required" })}
                className="select select-bordered"
                disabled={!selectedUpazila}
              >
                <option value="">Select Union</option>
                {filteredUnions.map((uni) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.name}
                  </option>
                ))}
              </select>
              {errors.unionId && (
                <span className="text-error text-xs mt-1">
                  {errors.unionId.message}
                </span>
              )}
            </div>
          </div>

          {/* Contact Number */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-semibold">Contact Number</span>
            </label>
            <input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^01[3-9]\d{8}$/,
                  message: "Enter a valid Bangladeshi number (01XXXXXXXXX)",
                },
              })}
              type="tel"
              placeholder="017XXXXXXXX"
              className="input input-bordered"
            />
            {errors.phone && (
              <span className="text-error text-xs mt-1">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="card-actions mt-8">
            <button
              type="submit"
              className="btn btn-error text-white w-full text-lg"
            >
              Register & Join Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterVolunteer;
