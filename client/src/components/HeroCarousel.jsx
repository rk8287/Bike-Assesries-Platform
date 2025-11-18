import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGES = [
  "/src/assets/banner1.webp",
  "/src/assets/banner2.webp",
  "/src/assets/banner3.webp",
];

function HeroCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % IMAGES.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIdx((p) => (p - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setIdx((p) => (p + 1) % IMAGES.length);

  const get = (offset) => IMAGES[(idx + offset) % IMAGES.length];

  return (
    <section className="w-full px-4 md:px-10 mt-6">
      <div className="relative w-full mx-auto">

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute z-30 left-2 sm:left-4 top-1/2 -translate-y-1/2 
          bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
        >
          <ChevronLeft className="text-white" size={22} />
        </button>

        <button
          onClick={next}
          className="absolute z-30 right-2 sm:right-4 top-1/2 -translate-y-1/2 
          bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
        >
          <ChevronRight className="text-white" size={22} />
        </button>

        {/* GRID: 1 column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">

          {/* LEFT BIG BANNER */}
          <div className="col-span-2 
              h-[260px] sm:h-[340px] md:h-[420px] lg:h-[560px] 
              rounded-2xl overflow-hidden shadow-xl">

            <AnimatePresence mode="wait">
              <motion.img
                key={get(0)}
                src={get(0)}
                className="w-full h-full object-cover rounded-2xl"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7 }}
              />
            </AnimatePresence>
          </div>

          {/* RIGHT TWO SMALL BANNERS */}
          <div className="flex flex-col gap-4 sm:gap-5 
              h-[260px] sm:h-[340px] md:h-[420px] lg:h-[560px]">

            {/* TOP BANNER */}
            <div className="flex-1 rounded-2xl overflow-hidden shadow-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={get(1)}
                  src={get(1)}
                  className="w-full h-full object-cover rounded-2xl"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>
            </div>

            {/* BOTTOM BANNER */}
            <div className="flex-1 rounded-2xl overflow-hidden shadow-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={get(2)}
                  src={get(2)}
                  className="w-full h-full object-cover rounded-2xl"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-8 bg-yellow-400" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default HeroCarousel;
