import React from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaEdit, FaShoppingBag, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  return (
    <div className="min-h-screen bg-white px-6 py-25">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            My <span className="text-yellow-500">Profile</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your personal information and account settings.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-100 p-8 rounded-2xl shadow-xl flex flex-col md:flex-row gap-8 items-center"
        >
          <FaUserCircle className="text-gray-400" size={120} />

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600 mt-1">{user?.email}</p>

            <div className="mt-4 flex gap-3">
              <button className="px-5 py-2 bg-yellow-500 rounded-lg text-black font-semibold hover:bg-yellow-400 transition">
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="px-5 py-2 border border-red-400 rounded-lg text-red-600 font-semibold hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {[
            { icon: <FaShoppingBag className="text-yellow-500 text-3xl" />, title: "My Orders" },
            { icon: <FaHeart className="text-yellow-500 text-3xl" />, title: "Wishlist" },
            { icon: <FaMapMarkerAlt className="text-yellow-500 text-3xl" />, title: "Saved Addresses" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer text-center"
            >
              {item.icon}
              <h2 className="mt-2 text-lg font-semibold text-gray-900">{item.title}</h2>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
