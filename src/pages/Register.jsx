import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { registerUser, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, name);
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
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Join Us!
          </h1>
          <p className="text-gray-600">
            Create your account to get started
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-xl space-y-4 border border-gray-100">
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            Register
          </button>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="btn btn-outline w-full"
          >
            Register with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
