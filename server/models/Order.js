const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    }
  ],
  shippingDetails: {
    fullName: String,
    phone: String,
    email: String,
    address: String,
  },
  paymentMethod: String,
  paymentStatus: { type: String, default: "pending" },
  totalAmount: Number,
  orderId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
