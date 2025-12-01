import React from "react";
import HeroCarousel from "./HeroCarousel";
import AccessoriesShowcase from "./AccessoriesShowcase";
import AutoScrollTicker from "./AutoScrollTicker";
import RoyalEnfieldModels from "./RoyalEnfieldModels";

function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0b0b0b] to-[#0f1724] text-white pb-16">
      <main className="pt-[18px]">
        <h2
          className="text-center text-[10px] sm:text-lg md:text-2xl 
               font-semibold tracking-wide text-black mt-3 px-3"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          #India’s No.1 Motorcycle Accessories Store
        </h2>

        <HeroCarousel />
        <AccessoriesShowcase />
        <AutoScrollTicker />
        <RoyalEnfieldModels />
      </main>

      {/* Floating Chat Button */}
      <a
        href="#"
        className="fixed right-6 bottom-6 bg-green-500 w-14 h-14 flex items-center justify-center rounded-full shadow-xl text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2h-1l-3 3v-3H9a6 6 0 0 1-6-6V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </a>

      {/* animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;
