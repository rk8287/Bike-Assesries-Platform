const express = require("express");
const { createOrder, getOrderById, getOrdersByUser, getAllOrders, updateOrderStatus } = require("../controllers/orderController");

const router = express.Router();

// Create new order
router.post("/", createOrder);

// Get order by ID
router.get("/:id", getOrderById);

// Get all orders by user
router.get("/user/:userId", getOrdersByUser);

// Get all orders (admin)
router.get("/admin/all", getAllOrders);

// Update order status (admin)
router.put("/status/:id", updateOrderStatus);


module.exports = router;
