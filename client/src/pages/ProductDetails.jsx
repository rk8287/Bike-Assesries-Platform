import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaShieldAlt, FaTruck, FaCreditCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import { addToCart } from "../slices/cartSlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { items: products, loading } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
  }, [dispatch, products.length]);

  const product = products.find((p) => p._id === id);

  const features = [
    "100% Authentic Product",
    "Fast Delivery",
    "Secure Payments",
    "Easy Returns & Replacement",
    "Premium Quality Guaranteed",
  ];

  if (loading)
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  if (!product)
    return <div className="text-center mt-20 text-xl">Product not found!</div>;

  // Handle Buy Now
  const handleBuyNow = () => {
    const exists = cartItems.find((item) => item._id === product._id);
    if (!exists) {
      dispatch(addToCart(product));
      toast.success("Product added to Cart!");
    }
    navigate("/check-out");
    toast.success("Proceeding to Checkout!");
  };

  return (
    <div className="min-h-screen bg-white text-black pt-16 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14">
        {/* LEFT: PRODUCT IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center"
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md object-contain rounded-2xl shadow-lg p-4 border border-gray-100"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* RIGHT: DETAILS */}
        <div>
          <h1 className="text-3xl font-bold tracking-wide">{product.name}</h1>

          <div className="flex items-center gap-2 mt-3 text-gray-700">
            <FaStar className="text-yellow-500" />
            <span>{product.rating || 4.5}</span>
            <span>({product.reviews || 0} reviews)</span>
          </div>

          <div className="mt-5">
            <span className="text-4xl font-extrabold text-gray-900">
              ₹{product.price}
            </span>
            {product.oldPrice && (
              <span className="line-through text-gray-400 ml-3">
                ₹{product.oldPrice}
              </span>
            )}
          </div>

          <p className="mt-6 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900">
              Key Features
            </h3>
            <ul className="mt-3 space-y-2 text-gray-600">
              {features.map((f, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-yellow-500 text-lg">•</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 px-6 py-3 rounded-xl font-bold shadow-md hover:bg-yellow-400 transition"
              onClick={() => {
                dispatch(addToCart(product));
                toast.success("Product added to cart!");
              }}
            >
              Add to Cart
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="border border-yellow-500 px-6 py-3 rounded-xl font-bold hover:bg-yellow-50 transition"
              onClick={handleBuyNow}
            >
              Buy Now
            </motion.button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 text-center text-gray-700">
            <div>
              <FaShieldAlt className="text-yellow-500 mx-auto text-2xl" />
              <p className="text-xs mt-2">1 Year Warranty</p>
            </div>
            <div>
              <FaTruck className="text-yellow-500 mx-auto text-2xl" />
              <p className="text-xs mt-2">Fast Delivery</p>
            </div>
            <div>
              <FaCreditCard className="text-yellow-500 mx-auto text-2xl" />
              <p className="text-xs mt-2">Secure Payments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
