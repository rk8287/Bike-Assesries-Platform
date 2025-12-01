// Profile.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { fetchOrdersByUser } from "../slices/orderSlice";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);

  const [activeTab, setActiveTab] = useState("");

  // Modal open/close
  const [isEditing, setIsEditing] = useState(false);

  // Form fields for editing
  const [editData, setEditData] = useState({
    name: "",
    email: "",
  });

  // Logout
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  // OPEN EDIT MODAL
  const openEditModal = () => {
    setEditData({
      name: user?.name || "",
      email: user?.email || "",
    });
    setIsEditing(true);
  };

  // SAVE UPDATED PROFILE
  const saveProfile = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        editData
      );

      // Update localStorage user (to keep login active)
      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      window.location.reload(); // refresh profile UI
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  // Tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "orders") dispatch(fetchOrdersByUser(user._id));
  };

  return (
    <div className="min-h-screen bg-white px-6 py-25">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            My <span className="text-yellow-500">Profile</span>
          </h1>
          <p className="text-gray-500 mt-2">Manage your personal information.</p>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-100 p-8 rounded-2xl shadow-xl flex flex-col md:flex-row gap-8 items-center"
        >
          <FaUserCircle className="text-gray-400" size={120} />

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {user?.name}
            </h2>
            <p className="text-gray-600 mt-1">{user?.email}</p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={openEditModal}
                className="px-5 py-2 bg-yellow-500 rounded-lg text-black font-semibold hover:bg-yellow-400 transition"
              >
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

        {/* Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">

          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => handleTabClick("orders")}
            className={`bg-white p-6 rounded-xl shadow-md border cursor-pointer text-center ${
              activeTab === "orders" ? "border-yellow-500" : "border-gray-100"
            }`}
          >
            <FaShoppingBag className="text-yellow-500 text-3xl mx-auto" />
            <h2 className="mt-2 text-lg font-semibold">My Orders</h2>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => handleTabClick("wishlist")}
            className={`bg-white p-6 rounded-xl shadow-md border cursor-pointer text-center ${
              activeTab === "wishlist" ? "border-yellow-500" : "border-gray-100"
            }`}
          >
            <FaHeart className="text-yellow-500 text-3xl mx-auto" />
            <h2 className="mt-2 text-lg font-semibold">Wishlist</h2>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => handleTabClick("addresses")}
            className={`bg-white p-6 rounded-xl shadow-md border cursor-pointer text-center ${
              activeTab === "addresses"
                ? "border-yellow-500"
                : "border-gray-100"
            }`}
          >
            <FaMapMarkerAlt className="text-yellow-500 text-3xl mx-auto" />
            <h2 className="mt-2 text-lg font-semibold">Saved Addresses</h2>
          </motion.div>
        </div>

        {/* Orders */}
        {activeTab === "orders" && (
          <div className="mt-10">
            {!orders || orders.length === 0 ? (
              <p className="text-gray-500 text-center">No orders found.</p>
            ) : (
              orders.map((order) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-md border border-yellow-500 p-6 mb-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-bold">{order._id}</p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-green-400 text-white font-semibold">
                      {order.paymentStatus}
                    </span>
                  </div>

                  <div className="mt-4 border-t border-yellow-500 pt-4 space-y-3">
                    {order.products.map((p, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <img
                          src={p.image}
                          alt=""
                          className="w-16 h-16 rounded-lg object-cover border"
                        />
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-gray-500">
                            Qty: {p.quantity} × ₹{p.price}
                          </p>
                        </div>
                        <p className="ml-auto font-semibold">
                          ₹{p.price * p.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-96 p-6 rounded-xl shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="border p-2 rounded-lg w-full mb-3"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />

            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="border p-2 rounded-lg w-full mb-4"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={saveProfile}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
