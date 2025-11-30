import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../slices/productSlice";
import { motion } from "framer-motion";
import { Package, Users, Mail, PlusCircle, Pencil, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: products, loading } = useSelector((state) => state.products);
  const { items: users, loading: usersLoading } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black text-white p-6 md:block shadow-2xl hidden md:block">
        <h1 className="text-2xl font-bold text-yellow-400 mb-6 md:mb-10">
          Admin Panel
        </h1>
        <ul className="space-y-4 md:space-y-6 text-lg">
          <Link
            to={"/admin/createProduct"}
            className="flex items-center gap-3 cursor-pointer hover:text-yellow-400 transition"
          >
            <Package size={20} /> Create Products
          </Link>
          <Link
            to={"/admin/users"}
            className="flex items-center gap-3 cursor-pointer hover:text-yellow-400 transition"
          >
            <Users size={20} /> Users
          </Link>
          <Link
            to={"/admin/contact"}
            className="flex items-center gap-3 cursor-pointer hover:text-yellow-400 transition"
          >
            <Mail size={20} /> Contacts
          </Link>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 bg-gray-50 mt-18">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-3 sm:mb-0">
            Dashboard Overview
          </h2>

          <button
            onClick={() => navigate("/admin/createProduct")}
            className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-500 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <PlusCircle size={18} /> Add Product
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Total Products */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <div className="rounded-2xl shadow-md border-l-8 border-yellow-400 bg-white">
              <div className="p-4 sm:p-6">
                <p className="text-gray-600 text-sm sm:text-base">Total Products</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-black">
                  {loading ? "Loading..." : products.length}
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Users */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <div className="rounded-2xl shadow-md border-l-8 border-black bg-white">
              <div className="p-4 sm:p-6">
                <p className="text-gray-600 text-sm sm:text-base">Registered Users</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-black">
                  {usersLoading ? "Loading..." : users.length}
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Messages */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <div className="rounded-2xl shadow-md border-l-8 border-yellow-500 bg-white">
              <div className="p-4 sm:p-6">
                <p className="text-gray-600 text-sm sm:text-base">New Messages</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-black">32</h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* All Products Section */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">All Products</h2>

          {loading ? (
            <p className="text-center py-4 text-gray-500">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center py-4 text-gray-600">No products found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] sm:min-w-[600px]">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 sm:p-3 text-left">Image</th>
                    <th className="p-2 sm:p-3 text-left">Name</th>
                    <th className="p-2 sm:p-3 text-left">Price</th>
                    <th className="p-2 sm:p-3 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((p) => (
                    <tr key={p._id} className="border-b hover:bg-gray-100">
                      <td className="p-2 sm:p-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                        />
                      </td>

                      <td className="p-2 sm:p-3 font-semibold">{p.name}</td>

                      <td className="p-2 sm:p-3 text-green-600 font-bold">
                        ₹{p.price}
                      </td>

                      <td className="p-2 sm:p-3 flex gap-2 sm:gap-3">
                        {/* Edit */}
                        <button
                          onClick={() =>
                            navigate(`/admin/editProduct/${p._id}`)
                          }
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => deleteHandler(p._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
