import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { TiUserAdd } from "react-icons/ti";
import { FcGoogle } from "react-icons/fc";
import { FaSignInAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const { loginUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect to wherever they came from or the default dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (data) => {
    try {
      const res = await loginUser(data.email, data.password);
      const token = await res.user.getIdToken();
      localStorage.setItem("access-token", token);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const userRole = response.data.role;

      if (!userRole) {
        throw new Error(
          "User role not found in database. Please contact admin.",
        );
      }

      Swal.fire({ icon: "success", title: "Login successful", timer: 1000 });

      // Navigate based on the exact role string from DB
      navigate(`/dashboard/${userRole.toLowerCase()}/home`, { replace: true });
    } catch (err) {
      console.error("Login Error Details:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await googleSignIn();
      const token = await res.user.getIdToken();
      localStorage.setItem("access-token", token);

      Swal.fire({
        icon: "success",
        title: "Google Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      localStorage.removeItem("access-token");
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">
            Welcome Back!
          </h1>
          <p className="text-gray-600">Login to access your account</p>
          <div className="flex justify-center ">
            <p className="text-gray-500 mt-2 text-sm">
              New here?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1"
              >
                <TiUserAdd /> Register
              </Link>
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="bg-white p-8 rounded-2xl shadow-xl space-y-4 border border-gray-100"
        >
          <div className="form-control">
            <input
              type="email"
              placeholder="Email"
              className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <input
              type="password"
              placeholder="Password"
              className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full text-white">
            <FaSignInAlt /> Login
          </button>

          <div className="divider text-gray-400 text-xs uppercase">OR</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline btn-ghost w-full flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-2xl" /> Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
