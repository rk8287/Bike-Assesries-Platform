import React from "react";
import { motion } from "framer-motion";

function CheckoutPage() {
  const items = [
    {
      id: 1,
      title: "LED Headlight",
      price: 999,
      qty: 1,
      img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2025/09/LIU-HJG-M3-Remote-Controlled-LED-Headlight-Bulb-White-Yellow-Dual-Intensity-60W-80W-247x247.jpg",
    },
    {
      id: 2,
      title: "Riding Gloves",
      price: 799,
      qty: 1,
      img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2025/07/NGAGE-Hyper-Flow-Performance-Air-Filter-for-Royal-Enfield-Classic-650-2.png",
    },
  ];

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-25">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Checkout <span className="text-yellow-500">Page</span>
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ------------------ LEFT SIDE: FORM ------------------ */}
          <div className="lg:col-span-2 space-y-10">

            {/* Shipping Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Shipping Details
              </h2>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="flex flex-col">
                  <label className="text-gray-600 font-medium">Full Name</label>
                  <input
                    type="text"
                    className="mt-2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder="Your Name"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-600 font-medium">Mobile</label>
                  <input
                    type="text"
                    className="mt-2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="text-gray-600 font-medium">Email</label>
                  <input
                    type="email"
                    className="mt-2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder="Email Address"
                  />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="text-gray-600 font-medium">Address</label>
                  <textarea
                    rows={3}
                    className="mt-2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder="House No, Street, City, State"
                  ></textarea>
                </div>
              </form>
            </motion.div>

            {/* Payment Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Payment Method
              </h2>

              <div className="space-y-4">

                <label className="flex items-center gap-3 cursor-pointer bg-gray-50 p-4 rounded-xl hover:bg-gray-100">
                  <input type="radio" name="payment" className="h-5 w-5" />
                  <span className="text-gray-800 font-medium">Cash on Delivery</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer bg-gray-50 p-4 rounded-xl hover:bg-gray-100">
                  <input type="radio" name="payment" className="h-5 w-5" />
                  <span className="text-gray-800 font-medium">UPI / Wallet</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer bg-gray-50 p-4 rounded-xl hover:bg-gray-100">
                  <input type="radio" name="payment" className="h-5 w-5" />
                  <span className="text-gray-800 font-medium">Debit / Credit Card</span>
                </label>

              </div>
            </motion.div>
          </div>

          {/* ------------------ RIGHT SIDE: ORDER SUMMARY ------------------ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 h-fit"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

            {/* Items */}
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img src={item.img} className="w-20 h-20 object-contain" />
                  <div>
                    <h3 className="text-gray-900 font-semibold">{item.title}</h3>
                    <p className="text-gray-600">Qty: {item.qty}</p>
                    <p className="text-gray-800 font-bold">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Values */}
            <div className="mt-6 space-y-3 text-gray-700 text-lg">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between text-2xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full mt-6 py-4 bg-yellow-500 text-black font-bold rounded-xl text-lg hover:bg-yellow-400 shadow-md transition">
              Place Order
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
