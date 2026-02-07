import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MdLogin } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import { FcGoogle } from "react-icons/fc";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the path the user came from, or default to "/dashboard"
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      alert("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      alert("Login with Google successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">
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
                <TiUserAdd></TiUserAdd> Register
              </Link>
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-xl space-y-4 border border-gray-100"
        >
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-error w-full text-white">
            <FaSignInAlt />
            Login
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
          >
            <FcGoogle className="text-2xl mr-2" />
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
