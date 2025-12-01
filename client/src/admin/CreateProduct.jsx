import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { createProduct } from "../slices/productSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const royalEnfieldBrands = [
    "Classic 350",
    "Bullet 350",
    "Hunter 350",
    "Meteor 350",
    "Scram 411",
    "Himalayan 450",
    "Interceptor 650",
    "Continental GT 650",
    "Super Meteor 650",
    "Shotgun 650",
    "Thunderbird 350X",
    "Thunderbird 500X",
  ];

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    image: "",
    description: "",
    brand: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(createProduct(formData));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Product Created Successfully!");
      navigate("/admin-dashboard");
    } else {
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-black text-center">
          Create New Product
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Product Name */}
          <div>
            <label className="block font-semibold mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-100 p-3 rounded-xl"
              required
            />
          </div>

          {/* Product Type */}
          <div>
            <label className="block font-semibold mb-1">Product Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-gray-100 p-3 rounded-xl"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-gray-100 p-3 rounded-xl"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-semibold mb-1">Product Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-gray-100 p-3 rounded-xl"
              required
            />
          </div>

          {/* Updated Brand Field (Dropdown) */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Select Royal Enfield Model</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full bg-gray-100 p-3 rounded-xl cursor-pointer"
              required
            >
              <option value="">Select Brand</option>
              {royalEnfieldBrands.map((bike, index) => (
                <option key={index} value={bike}>
                  {bike}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full bg-gray-100 p-3 rounded-xl"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-black text-yellow-400 font-semibold hover:bg-gray-900"
            >
              Create Product
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default CreateProduct;
