// OfferNavbar.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Gift, Percent } from "lucide-react";

const OFFERS = [
  { icon: <Flame size={16} />, text: "🔥 40% OFF on Bike Accessories — Limited Time!" },
  { icon: <Gift size={16} />, text: "🎁 Buy 2 Get 1 FREE — Riding Gear Offer Today!" },
  { icon: <Percent size={16} />, text: "⚡ Flash Sale: Helmet Collection Up To 60% OFF" },
  { icon: <Flame size={16} />, text: "🔥 Mega Combo Deals Available — Hurry!" },
];

function OfferNavbar() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % OFFERS.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    // explicit height: h-11 => 44px. z-50 places it above main nav.
    <div className="fixed top-0 left-0 w-full h-11 z-50">
      <div className="w-full h-full bg-gradient-to-r from-[#141414] via-[#1d2533] to-[#0d0d0d] border-b border-white/10 shadow-lg">
        <div className="max-w-screen-xl mx-auto h-full flex items-center justify-center px-3 sm:px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2 text-[11px] sm:text-sm md:text-base font-medium text-white"
            >
              <span className="text-yellow-400">{OFFERS[idx].icon}</span>
              <span className="hover:text-yellow-400 transition">{OFFERS[idx].text}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default OfferNavbar;
