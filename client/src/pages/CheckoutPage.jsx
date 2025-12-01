import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import scanner from "../assets/scanner.png";
import { createOrder } from "../slices/orderSlice";

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user); // Logged-in user

  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiPaid, setUpiPaid] = useState(false);
  const [error, setError] = useState("");

  // Safe subtotal and total calculation
  const subtotal = cartItems.reduce(
  (s, i) => s + (Number(i.price) || 0) * (Number(i.quantity) || 1),
  0
);

  const shipping = cartItems.length > 0 ? 99 : 0;
  const total = subtotal + shipping;

  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handlePlaceOrder = async () => {
    setError("");

    // Validation
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    if (
      !shippingDetails.fullName ||
      !shippingDetails.phone ||
      !shippingDetails.address
    ) {
      setError("Please fill all required shipping details.");
      return;
    }

    if (paymentMethod === "UPI" && !upiPaid) {
      setError("Please complete UPI payment before placing the order.");
      return;
    }

    try {
      const orderData = {
        userId: user?._id || "guest",
        products: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          price: Number(item.price) || 0,
          quantity: Number(item.quantity) || 1,
          image: item.image,
        })),
        shippingDetails,
        paymentMethod,
        paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
        totalAmount: total,
      };

      const res = await dispatch(createOrder(orderData)).unwrap();
      navigate(`/success/${res.orderId}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-25">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Checkout <span className="text-yellow-500">Page</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT: Shipping & Payment */}
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
                    name="fullName"
                    value={shippingDetails.fullName}
                    onChange={handleInputChange}
                    className="mt-2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder="Your Name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-600 font-medium">Mobile</label>
                  <input
                    type="text"
                    name="phone"
                    value={shippingDetails.phone}
                    onChange={handleInputChange}
                    className="mt-2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="text-gray-600 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingDetails.email}
                    onChange={handleInputChange}
                    className="mt-2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder="Email Address"
                  />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="text-gray-600 font-medium">Address</label>
                  <textarea
                    rows={3}
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    className="mt-2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder="House No, Street, City, State"
                  />
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
                <label
                  className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl hover:bg-gray-100 ${
                    paymentMethod === "COD" ? "bg-gray-100" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="h-5 w-5"
                    onChange={() => setPaymentMethod("COD")}
                  />
                  <span className="text-gray-800 font-medium">
                    Cash on Delivery
                  </span>
                </label>
                <label
                  className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl hover:bg-gray-100 ${
                    paymentMethod === "UPI" ? "bg-gray-100" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="h-5 w-5"
                    onChange={() => setPaymentMethod("UPI")}
                  />
                  <span className="text-gray-800 font-medium">UPI / Wallet</span>
                </label>
                <label
                  className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl hover:bg-gray-100 ${
                    paymentMethod === "Card" ? "bg-gray-100" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="h-5 w-5"
                    onChange={() => setPaymentMethod("Card")}
                  />
                  <span className="text-gray-800 font-medium">
                    Debit / Credit Card
                  </span>
                </label>
              </div>

              {paymentMethod === "UPI" && (
                <div className="mt-6 bg-yellow-50 p-6 rounded-xl text-center">
                  <h3 className="text-lg font-bold">Pay via UPI</h3>
                  <p className="mt-2">
                    Scan QR code or use this UPI ID:{" "}
                    <span className="font-mono text-lg">7982752592@ptyes</span>
                  </p>
                  <img
                    src={scanner}
                    alt="UPI QR"
                    className="mx-auto mt-4 w-40 h-40"
                  />
                  <button
                    className="mt-4 px-6 py-3 bg-yellow-500 rounded-xl font-bold hover:bg-yellow-400"
                    onClick={() => setUpiPaid(true)}
                  >
                    I have paid
                  </button>
                  {upiPaid && (
                    <p className="mt-2 text-green-600 font-semibold">
                      Payment marked as done. You can place your order now!
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* RIGHT: Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 h-fit"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>
            <div className="space-y-5">
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={item.image}
                      className="w-20 h-20 object-contain"
                    />
                    <div>
                      <h3 className="text-gray-900 font-semibold">{item.name}</h3>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-gray-800 font-bold">₹{item.price}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 space-y-3 text-gray-700 text-lg">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-2xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {error && <p className="text-red-500 mt-3 font-semibold">{error}</p>}

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 py-4 bg-yellow-500 text-black font-bold rounded-xl text-lg hover:bg-yellow-400 shadow-md transition"
            >
              Place Order
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
