import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { MdLogin } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";

// ImageBB API Key (Put this in your .env)
const image_hosting_key = "a8eeb785eb2865d9ddb86c5f707ce65f";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth(); // Ensure updateUserProfile is in your hook
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  // States for Location Data
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  // Load JSON Data
  useEffect(() => {
    fetch("/districts.json").then(res => res.json()).then(data => setDistricts(data.find(i => i.type === "table").data));
    fetch("/upazilas.json").then(res => res.json()).then(data => setUpazilas(data.find(i => i.type === "table").data));
  }, []);

  // Filter Upazilas when District changes
  const selectedDistrictId = watch("district");
  useEffect(() => {
    if (selectedDistrictId) {
      const filtered = upazilas.filter(u => u.district_id === selectedDistrictId);
      setFilteredUpazilas(filtered);
    }
  }, [selectedDistrictId, upazilas]);

  const handleRegister = async (data) => {
    try {
      // 1. Upload Image to ImageBB
      const imageFile = { image: data.avatar[0] };
      const resImg = await axios.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" }
      });

      if (resImg.data.success) {
        const photoURL = resImg.data.data.display_url;

        // 2. Register in Firebase
        const result = await registerUser(data.email, data.password);

        // 3. Update Firebase Profile (Fixes displayName being null)
        await updateUserProfile(data.fullName, photoURL);

        const token = await result.user.getIdToken();

        // 4. Save to MongoDB
        const userInfo = {
          uid: result.user.uid,
          name: data.fullName,
          email: data.email,
          avatar: photoURL,
          bloodGroup: data.bloodGroup,
          district: districts.find(d => d.id === data.district)?.name,
          upazila: upazilas.find(u => u.id === data.upazila)?.name,
          role: "donor",
          status: "active",
        };

        await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, userInfo, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire("Success", "Account created successfully!", "success");
        navigate("/dashboard/donor");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl border">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
        <form onSubmit={handleSubmit(handleRegister)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Name */}
          <div className="form-control">
            <label className="label">Full Name</label>
            <input type="text" {...register("fullName", { required: true })} className="input input-bordered" />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">Email</label>
            <input type="email" {...register("email", { required: true })} className="input input-bordered" />
          </div>

          {/* Avatar */}
          <div className="form-control">
            <label className="label">Avatar</label>
            <input type="file" {...register("avatar", { required: true })} className="file-input file-input-bordered w-full" />
          </div>

          {/* Blood Group */}
          <div className="form-control">
            <label className="label">Blood Group</label>
            <select {...register("bloodGroup", { required: true })} className="select select-bordered">
              <option value="">Select</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>

          {/* District */}
          <div className="form-control">
            <label className="label">District</label>
            <select {...register("district", { required: true })} className="select select-bordered">
              <option value="">Select District</option>
              {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>

          {/* Upazila */}
          <div className="form-control">
            <label className="label">Upazila</label>
            <select {...register("upazila", { required: true })} className="select select-bordered" disabled={!selectedDistrictId}>
              <option value="">Select Upazila</option>
              {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">Password</label>
            <input type="password" {...register("password", { required: true, minLength: 6 })} className="input input-bordered" />
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label">Confirm Password</label>
            <input type="password" {...register("confirmPassword", { 
              validate: value => value === watch('password') || "Passwords do not match" 
            })} className="input input-bordered" />
            {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
          </div>

          <div className="md:col-span-2 mt-4">
            <button type="submit" className="btn btn-primary w-full"><FaSignInAlt /> Register</button>
          </div>
        </form>
        <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-blue-600 font-bold">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;