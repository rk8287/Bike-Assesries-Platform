import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";

function AccessoriesShowcase() {
  const dispatch = useDispatch();

  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Take latest 4 products for New Arrivals section
  const latestProducts = [...(products || [])]
    .reverse() // newest first
    .slice(0, 4);

  return (
    <section className="mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-black">
            New <span className="text-yellow-500 drop-shadow-sm">ARRIVALS</span>
          </h3>

          <Link
            to={"/products"}
            className="text-sm text-black/60 hover:text-yellow-500 transition font-medium"
          >
            See all →
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-gray-500 py-10">Loading products...</p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {!loading &&
            latestProducts.map((p) => (
              <motion.div
                key={p._id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative p-4 rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition"
              >
                {/* Discount (fake if no MRP) */}
                <div className="absolute top-3 left-3 bg-yellow-500 text-black font-semibold text-xs w-12 h-12 flex items-center justify-center rounded-full shadow-lg border border-yellow-300">
                  -{p.discount || "10%"}
                </div>

                {/* Product Image */}
                <Link to={`/product/${p._id}`}>
                  <div className="w-full h-44 flex items-center justify-center overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="max-h-36 object-contain transition duration-500"
                    />
                  </div>
                </Link>

                {/* Title + Price */}
                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <div className="text-black font-semibold">
                      {p.name.length > 20 ? p.name.slice(0, 20) + "..." : p.name}
                    </div>
                    <div className="text-black/70 text-sm mt-1">
                      {p.brand || "Premium Quality"}
                    </div>
                  </div>

                  <div className="text-red-600 font-bold">₹{p.price}</div>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition">
                    Add to Cart
                  </button>
                  <button className="w-12 py-2 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
                    <Heart className="text-black" size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
        </div>

        {/* No products fallback */}
        {!loading && latestProducts.length === 0 && (
          <p className="text-center text-gray-500 py-10">No products available</p>
        )}
      </div>
    </section>
  );
}

export default AccessoriesShowcase;
