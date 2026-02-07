import { use, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "../context/AuthContext";
import { MdLogin } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaSignInAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Register = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  const { registerUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const { registerUser: registerUserContext } = use(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // console.log("Inside Register -> ", registerUserContext);

  const handleRegister = async (data) => {
    try {
      await registerUserContext(data.email, data.password, data.fullName);
      console.log("Data inside registration -> ", data);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await googleSignIn();
      alert("Signup with Google successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Join Us!</h1>
          <p className="text-gray-600">Create your account to get started</p>
          <div className="flex justify-center ">
            <p className="text-gray-500 mt-2 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 font-semibold hover:underline inline-flex items-center gap-1"
              >
                <MdLogin></MdLogin> Login
              </Link>
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="bg-white p-8 rounded-2xl shadow-xl space-y-4 border border-gray-100"
        >
          {/* fullName */}
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            {...register("fullName", { required: true })}
            required
          />

          {/* email */}
          <input
            type="email"
            placeholder="Email"
            className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address",
              }
            })}
            required
          />
          {/* Email Error Message Display */}
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.email.message}
            </p>
          )}

          {/* password */}
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[0-9]).*$/,
                message:
                  "Must include at least one uppercase letter and one number",
              },
            })}
            required
          />
          {/* Password Error Message Display */}
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.password.message}
            </p>
          )}

          <button type="submit" className="btn btn-error w-full text-white">
            <FaSignInAlt />
            Sign Up
          </button>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="btn btn-outline w-full"
          >
            <FcGoogle className="text-2xl mr-2" />
            Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
