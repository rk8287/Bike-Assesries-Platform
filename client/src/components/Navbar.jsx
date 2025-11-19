import React from "react";
import { Menu, Search, Heart, User, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

function Navbar() {
  return (
    <header
      className="fixed w-full top-[28px] sm:top-[42px] z-40 
                       bg-black backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          

          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 
               rounded-full bg-white 
               flex items-center justify-center 
               overflow-hidden shadow-lg"
              >
                <img
                  src={logo} 
                  alt="Bullet Meri Jaan Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              
              <div className="hidden sm:block leading-tight">
                <h1
                  className="text-white font-extrabold text-lg tracking-wide"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Bullet <span className="text-yellow-400">Meri</span> Jaan
                </h1>

                <p
                  className="text-xs text-white/60"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Bike Accessories
                </p>
              </div>
            </Link>
          </div>

          {/* SEARCH BAR */}
          <div className="flex-1 px-2 sm:px-4">
            <div className="relative max-w-md mx-auto">
              <input
                className="w-full pl-4 pr-10 py-1.5 sm:py-2 
                           rounded-full bg-white/10 text-white 
                           placeholder:text-white/50 text-sm sm:text-base
                           outline-none border border-white/10"
                placeholder="Search accessories, bikes, parts..."
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="text-white" size={18} />
              </div>
            </div>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="p-1.5 sm:p-2 rounded-md hover:bg-white/10">
              <Heart className="text-white" size={18} />
            </button>

            <Link
              to={"/profile"}
              className="p-1.5 sm:p-2 rounded-md hover:bg-white/10"
            >
              <User className="text-white" size={18} />
            </Link>

            <Link
              to={"/cart"}
              className="relative p-1.5 sm:p-2 rounded-md hover:bg-white/10"
            >
              <ShoppingCart className="text-white" size={18} />
              <span className="absolute -top-1 -right-1 text-[10px] bg-yellow-400 text-black rounded-full px-[5px]">
                3
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
