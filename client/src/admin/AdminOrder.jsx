import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../slices/orderSlice"; // ✅ admin fetch all orders
import { motion } from "framer-motion";
import { ShoppingBag, Loader, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchAllOrders()); // fetch all orders for admin
  }, [dispatch]);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ShoppingBag size={32} className="text-yellow-500" />
        <h1 className="text-2xl sm:text-3xl font-bold">All Orders</h1>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <Loader className="animate-spin" size={34} />
        </div>
      )}

      {/* No orders */}
      {!loading && orders.length === 0 && (
        <p className="text-center py-6 text-gray-600 text-lg">No orders found.</p>
      )}

      {/* Orders Table */}
      {!loading && orders.length > 0 && (
        <div className="overflow-x-auto bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Order ID</th>
                <th className="p-3">User ID</th>
                <th className="p-3">Products</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="p-3 font-semibold">{order._id.slice(-6)}</td>
                  <td className="p-3">{order.userId}</td>
                  <td className="p-3">
                    {order.products.map((p) => (
                      <div key={p._id} className="flex items-center gap-2 mb-1">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <span>{p.name}</span>
                      </div>
                    ))}
                  </td>
                  <td className="p-3 font-bold text-green-600">₹{order.totalAmount}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-xl text-sm font-semibold 
                      ${
                        order.status === "Delivered"
                          ? "bg-green-200 text-green-700"
                          : order.status === "Shipped"
                          ? "bg-blue-200 text-blue-700"
                          : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/admin/order/${order._id}`)}
                      className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                    >
                      <Eye size={18} /> View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrder;
