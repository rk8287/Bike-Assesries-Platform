import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

// Accessories data
const ACCESSORIES = [
  {
    id: 1,
    title: "LED Headlight",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2025/09/LIU-HJG-Shockproof-Mobile-Holder-with-Damper-and-Zero-Vibration-for-Motorcycle-Anti-Shake-Anti-Theft-247x247.jpg",
    price: "₹999",
    discount: "20%",
  },
  {
    id: 2,
    title: "Crash Guard",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2025/09/LIU-HJG-M3-Remote-Controlled-LED-Headlight-Bulb-White-Yellow-Dual-Intensity-60W-80W-247x247.jpg",
    price: "₹1499",
    discount: "30%",
  },
  {
    id: 3,
    title: "Riding Gloves",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2025/07/NGAGE-Hyper-Flow-Performance-Air-Filter-for-Royal-Enfield-Classic-650-2.png",
    price: "₹799",
    discount: "10%",
  },
  {
    id: 4,
    title: "Radiator Grill",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2025/09/Dug-Dug-OEM-Type-Heavy-Quality-Backrest-for-Classic-Goan-350_001-247x247.jpg",
    price: "₹1199",
    discount: "25%",
  },
];

function AccessoriesShowcase() {
  return (
    <section className="mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-black">
            New <span className="text-yellow-500 drop-shadow-sm">ARRIVALS</span>
          </h3>

          <a
            href="#"
            className="text-sm text-black/60 hover:text-yellow-500 transition font-medium"
          >
            See all →
          </a>
        </div>

        {/* Grid */}
        <Link to={'/product/sfs'} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACCESSORIES.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg hover:bg-white/10 transition"
            >
              {/* Discount Badge */}
              <div className="absolute top-3 left-3 bg-yellow-500 text-black font-semibold text-xs w-12 h-12 flex items-center justify-center rounded-full shadow-lg border border-yellow-300">
                -{p.discount}
              </div>

              {/* Product Image */}
              <div className="w-full h-44 flex items-center justify-center overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="max-h-36 object-contain transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Title + Price */}
              <div className="mt-3 flex items-start justify-between">
                <div>
                  <div className="text-black font-semibold">{p.title}</div>
                  <div className="text-black/70 text-sm mt-1">
                    High quality aftermarket part
                  </div>
                </div>
                <div className="text-red-600 font-bold">{p.price}</div>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition">
                  Add to Cart
                </button>
                <button className="w-12 py-2 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
                  <Heart className="text-white" size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </Link>
      </div>
    </section>
  );
}

export default AccessoriesShowcase;
