const Order = require("../models/Order");
const { v4: uuidv4 } = require("uuid");

// Create Order
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      products,
      shippingDetails,
      paymentMethod,
      paymentStatus,
      totalAmount,
    } = req.body;

    const order = new Order({
      orderId: uuidv4(),
      userId,
      products,
      shippingDetails,
      paymentMethod,
      paymentStatus,
      totalAmount,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("ORDER ERROR =>", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);


    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    console.error("ORDER ERROR =>", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Get all orders by user ID
const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }); // newest first

    if (!orders || orders.length === 0)
      return res.status(404).json({ message: "No orders found for this user." });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


// Get ALL Orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.json(orders);
  } catch (err) {
    console.error("ORDER ERROR =>", err.message);
    res.status(500).json({ message: err.message });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = { createOrder, getOrderById, getOrdersByUser,getAllOrders, updateOrderStatus };
