import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../slices/productSlice";
import { motion } from "framer-motion";
import {
  Package,
  Users,
  Mail,
  PlusCircle,
  Pencil,
  Trash,
  Menu,
  X,
  ShoppingBag,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

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
    <div className="min-h-screen w-full bg-white flex">

      {/* ================= MOBILE TOP NAV ================= */}
      <div className="md:hidden fixed w-full bg-black text-white p-4 flex justify-between items-center z-30 mt-16">
        <h1 className="text-xl font-bold">Admin Panel</h1>

        <button onClick={() => setMobileMenu(true)}>
          <Menu size={28} className="text-white" />
        </button>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setMobileMenu(false)}
        ></div>
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-black text-white p-6 shadow-xl z-40 transform
          transition-transform duration-300 ease-in-out
          ${mobileMenu ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Close Button on Mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setMobileMenu(false)}>
            <X size={28} className="text-white" />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-yellow-400 mb-10">Admin Menu</h1>

        <ul className="space-y-6 text-lg">
          <Link
            to={"/admin/createProduct"}
            className="flex items-center gap-3 hover:text-yellow-400"
            onClick={() => setMobileMenu(false)}
          >
            <Package size={20} /> Create Products
          </Link>

          <Link
            to={"/admin/users"}
            className="flex items-center gap-3 hover:text-yellow-400"
            onClick={() => setMobileMenu(false)}
          >
            <Users size={20} /> Users
          </Link>

          <Link
            to={"/admin/contact"}
            className="flex items-center gap-3 hover:text-yellow-400"
            onClick={() => setMobileMenu(false)}
          >
            <Mail size={20} /> Contacts
          </Link>

          <Link
            to={"/admin/orders"}
            className="flex items-center gap-3 hover:text-yellow-400"
            onClick={() => setMobileMenu(false)}
          >
            <ShoppingBag size={20} /> Orders
          </Link>
        </ul>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-4 sm:p-6 bg-gray-50 w-full 
        mt-20 md:mt-0   /* THIS FIXES THE MOBILE OVERLAP */
      ">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black">
            Dashboard Overview
          </h2>

          <button
            onClick={() => navigate("/admin/createProduct")}
            className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-500 flex items-center gap-2 mt-3 sm:mt-0"
          >
            <PlusCircle size={18} /> Add Product
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <motion.div whileHover={{ scale: 1.03 }}>
            <div className="rounded-2xl shadow-md border-l-8 border-yellow-400 bg-white p-6">
              <p className="text-gray-600">Total Products</p>
              <h3 className="text-3xl font-bold">{loading ? "..." : products.length}</h3>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <div className="rounded-2xl shadow-md border-l-8 border-black bg-white p-6">
              <p className="text-gray-600">Registered Users</p>
              <h3 className="text-3xl font-bold">{usersLoading ? "..." : users.length}</h3>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <div className="rounded-2xl shadow-md border-l-8 border-yellow-500 bg-white p-6">
              <p className="text-gray-600">New Messages</p>
              <h3 className="text-3xl font-bold">32</h3>
            </div>
          </motion.div>
        </div>

        {/* Products Table */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">All Products</h2>

          {loading ? (
            <p className="text-center py-4">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-center py-4">No products found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((p) => (
                    <tr key={p._id} className="border-b hover:bg-gray-100">
                      <td className="p-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </td>

                      <td className="p-3 font-semibold">{p.name}</td>

                      <td className="p-3 font-bold text-green-600">₹{p.price}</td>

                      <td className="p-3 flex gap-3">
                        <button
                          onClick={() => navigate(`/admin/editProduct/${p._id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </button>

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
