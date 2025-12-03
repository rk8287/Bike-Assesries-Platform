import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { removeFromCart } from "../slices/cartSlice";
import { Link } from "react-router-dom";
import {toast} from "sonner"

function Cart() {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);

  // Safely calculate subtotal
  const subtotal = cartItems.reduce((s, i) => {
    const price = Number(i.price) || 0;
    const qty = Number(i.qty) || 1;
    return s + price * qty;
  }, 0);

  const shipping = cartItems.length > 0 ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white px-6 py-25">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">
          Shopping <span className="text-yellow-500">Cart</span>
        </h1>
        <p className="text-gray-500 mt-2">Review your items before checkout.</p>

        <div className="mt-10 space-y-6">
          {cartItems.length === 0 && <p className="text-center">Your cart is empty</p>}

          {cartItems.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              className="flex flex-col md:flex-row items-center gap-6 bg-white p-5 border border-gray-200 rounded-2xl shadow-md"
            >
              <img src={item.image} alt={item.name} className="w-28 h-28 object-contain" />
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                <p className="text-gray-600 mt-1">₹{Number(item.price) || 0}</p>
                <p className="text-gray-600 mt-1">Qty: {Number(item.qty) || 1}</p>
              </div>

              <button
                className="text-red-500 hover:text-red-600 transition"
                onClick={() => dispatch(removeFromCart(item._id)) && toast.success("Item removed from cart")}
              >
                <FaTrash />
              </button>
            </motion.div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <motion.div className="mt-10 p-6 bg-white border border-gray-200 shadow-xl rounded-2xl max-w-md ml-auto">
            <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>

            <div className="flex justify-between mt-4 text-gray-700">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mt-3 text-gray-700">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-semibold text-gray-900">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Link
              to="/check-out"
              className="block w-full mt-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition text-center"
            >
              Proceed to Checkout
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Cart;
