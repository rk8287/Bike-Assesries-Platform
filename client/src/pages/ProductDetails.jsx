import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaShieldAlt, FaTruck, FaCreditCard } from "react-icons/fa";

function ProductDetails() {
  const product = {
    title: "Royal Enfield Hunter 350 Exhaust",
    price: "₹4,499",
    oldPrice: "₹6,999",
    rating: 4.8,
    reviews: 128,
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2025/07/NGAGE-Hyper-Flow-Performance-Air-Filter-for-Royal-Enfield-Classic-650-2.png",
    description:
      "Premium stainless-steel exhaust for Royal Enfield Hunter 350. Enhances sound, improves performance, and offers superior durability with a matte precision-finish.",
    features: [
      "Lightweight Performance Design",
      "Deep Bass Exhaust Sound",
      "Stainless Steel Build",
      "Heat Resistant Coating",
      "Easy Plug & Fit Installation",
    ],
  };

  return (
    <div className="min-h-screen bg-white text-black pt-16 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14">
        {/* LEFT: PRODUCT IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
          >
            <img
              src={product.img}
              alt={product.title}
              className="w-full max-w-md object-contain"
            />
          </motion.div>
        </motion.div>

        {/* RIGHT: PRODUCT DETAILS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-4"
        >
          <h1 className="text-3xl font-bold tracking-wide text-gray-900">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mt-3">
            <FaStar className="text-yellow-500" />
            <span className="text-gray-700">{product.rating}</span>
            <span className="text-gray-400">({product.reviews} reviews)</span>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-4xl font-extrabold text-gray-900">
              {product.price}
            </span>
            <span className="line-through text-gray-400 text-lg">
              {product.oldPrice}
            </span>
          </div>

          <p className="mt-6 text-gray-500 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900">
              Key Features
            </h3>
            <ul className="mt-3 space-y-2 text-gray-600">
              {product.features.map((f, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-yellow-500 text-lg">•</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold shadow-md hover:bg-yellow-400 transition-all"
            >
              Add to Cart
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="border border-yellow-500 text-yellow-600 px-6 py-3 rounded-xl font-bold hover:bg-yellow-50 transition-all"
            >
              Buy Now
            </motion.button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div>
              <FaShieldAlt className="text-yellow-500 mx-auto text-2xl" />
              <p className="text-xs mt-2 text-gray-500">1 Year Warranty</p>
            </div>
            <div>
              <FaTruck className="text-yellow-500 mx-auto text-2xl" />
              <p className="text-xs mt-2 text-gray-500">Fast Delivery</p>
            </div>
            <div>
              <FaCreditCard className="text-yellow-500 mx-auto text-2xl" />
              <p className="text-xs mt-2 text-gray-500">Secure Payments</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetails;
