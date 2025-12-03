import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById, updateOrderStatus } from "../slices/orderSlice";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader, Package, User, MapPin, Truck } from "lucide-react";

function AdminOrderView() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { order, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  const handleStatusChange = (e) => {
    dispatch(updateOrderStatus({ orderId: id, status: e.target.value }));
  };

  if (loading || !order) {
    return (
      <div className="flex justify-center py-10">
        <Loader className="animate-spin" size={34} />
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 tracking-tight">
        Order Overview
      </h1>

      {/* GRID FOR 3 MAIN CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ORDER INFO CARD */}
        <motion.div
          className="bg-white/90 backdrop-blur-md shadow-xl p-6 rounded-3xl border border-gray-200"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Package className="text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Order Information</h2>
          </div>

          <div className="space-y-2 text-gray-700">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>User ID:</strong> {order.userId}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            {/* STATUS SELECT */}
            <div className="mt-4">
              <label className="font-semibold">Change Status:</label>
              <select
                className="block mt-2 p-2 border border-gray-300 rounded-xl w-full shadow-sm"
                value={order.status}
                onChange={handleStatusChange}
              >
                <option value="In Process">In Process</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* SHIPPING DETAILS CARD */}
        <motion.div
          className="bg-white/90 backdrop-blur-md shadow-xl p-6 rounded-3xl border border-gray-200"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">Shipping Details</h2>
          </div>

          <div className="space-y-2 text-gray-700">
            <p><strong>Name:</strong> {order.shippingDetails.name}</p>
            <p><strong>Phone:</strong> {order.shippingDetails.phone}</p>
            <p><strong>Address:</strong> {order.shippingDetails.address}</p>
            <p><strong>City:</strong> {order.shippingDetails.city}</p>
            <p><strong>Pincode:</strong> {order.shippingDetails.pincode}</p>
          </div>
        </motion.div>

        {/* USER DETAILS CARD */}
        <motion.div
          className="bg-white/90 backdrop-blur-md shadow-xl p-6 rounded-3xl border border-gray-200"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <User className="text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">Customer</h2>
          </div>

          <div className="space-y-2 text-gray-700">
            <p><strong>User ID:</strong> {order.userId}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
        </motion.div>
      </div>

      {/* PRODUCT LIST */}
      <motion.div
        className="mt-8 bg-white/95 p-6 rounded-3xl shadow-xl border border-gray-200"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Truck className="text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        </div>

        <div className="divide-y">
          {order.products.map((item) => (
            <div key={item._id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl shadow-md object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-gray-600">Quantity: {item.qty}</p>
                  <p className="text-green-600 font-bold text-lg">₹{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AdminOrderView;
