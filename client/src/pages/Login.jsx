import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../components/Loader";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

   if (loading) {
    return <Loader />; // Show loader while fetching data
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate("/"); // redirect after login
      toast.success("Login Successful!");
    } catch {
      toast.error("Login Failed. Please check your credentials!");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-gray-100 p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">Welcome Back</h2>
        <p className="text-center text-gray-500 mt-2">Login to continue your journey</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="text-right text-sm text-gray-600 hover:text-yellow-500 cursor-pointer">Forgot Password?</div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-yellow-500 rounded-xl text-black font-bold hover:bg-yellow-400 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?
          <a href="/signup" className="text-yellow-600 font-semibold ml-1">
            Sign Up
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
