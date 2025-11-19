import React from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Cart() {
  const cartItems = [
    {
      id: 1,
      title: "LED Headlight",
      price: 999,
      img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2025/09/LIU-HJG-M3-Remote-Controlled-LED-Headlight-Bulb-White-Yellow-Dual-Intensity-60W-80W-247x247.jpg",
    },
    {
      id: 2,
      title: "Riding Gloves",
      price: 799,
      img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2025/07/NGAGE-Hyper-Flow-Performance-Air-Filter-for-Royal-Enfield-Classic-650-2.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-25">
      <div className="max-w-5xl mx-auto">

       
        <h1 className="text-3xl font-bold text-gray-900">
          Shopping <span className="text-yellow-500">Cart</span>
        </h1>
        <p className="text-gray-500 mt-2">Review your items before checkout.</p>

        
        <div className="mt-10 space-y-6">
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              className="flex flex-col md:flex-row items-center gap-6 bg-white p-5 border border-gray-200 rounded-2xl shadow-md"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-28 h-28 object-contain"
              />

              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
                <p className="text-gray-600 mt-1">₹{item.price}</p>
              </div>

              <button className="text-red-500 hover:text-red-600 transition">
                <FaTrash />
              </button>
            </motion.div>
          ))}
        </div>

       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 p-6 bg-white border border-gray-200 shadow-xl rounded-2xl max-w-md ml-auto"
        >
          <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>

          <div className="flex justify-between mt-4 text-gray-700">
            <span>Subtotal</span>
            <span>₹{999 + 799}</span>
          </div>

          <div className="flex justify-between mt-3 text-gray-700">
            <span>Shipping</span>
            <span>₹99</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-semibold text-gray-900">
            <span>Total</span>
            <span>₹{999 + 799 + 99}</span>
          </div>

          <Link
  to="/check-out"
  className="block w-full mt-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition text-center"
>
  Proceed to Checkout
</Link>

        </motion.div>
      </div>
    </div>
  );
}

export default Cart;
