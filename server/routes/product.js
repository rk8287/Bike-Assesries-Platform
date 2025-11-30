const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../controllers/productController");

router.route("/")
  .get(getProducts)
  .post(protect, createProduct);

router.route("/:id")
  .get(getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
