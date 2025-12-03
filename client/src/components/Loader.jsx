import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      {/* Rotating outer circle */}
      <motion.div
        className="w-24 h-24 border-4 border-t-yellow-400 border-b-white border-l-yellow-400 border-r-white rounded-full relative"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        {/* Inner pulsating circle */}
        <motion.div
          className="w-12 h-12 bg-yellow-400 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="absolute bottom-20 text-white text-lg font-medium"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loader;
