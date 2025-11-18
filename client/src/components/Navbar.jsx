import React from 'react';
import { Menu, Search, Heart, User, ShoppingCart } from 'lucide-react';

function Navbar() {
  return (
    <header className="fixed w-full top-[38px] sm:top-[42px] z-40 
                       bg-black backdrop-blur-md border-b border-white/5">

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="p-1.5 sm:p-2 rounded-md hover:bg-white/10 transition">
              <Menu className="text-white" size={20} />
            </button>

            <a className="flex items-center gap-2" href="#">
              <div className="w-9 h-9 sm:w-10 sm:h-10 
                              rounded-full bg-yellow-400 
                              flex items-center justify-center 
                              font-bold text-black">
                DD
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-white font-bold text-sm sm:text-base">Dug Dug</div>
                <div className="text-xs text-white/70 -mt-0.5">Motorcycles</div>
              </div>
            </a>
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

            <button className="p-1.5 sm:p-2 rounded-md hover:bg-white/10">
              <User className="text-white" size={18} />
            </button>

            <button className="relative p-1.5 sm:p-2 rounded-md hover:bg-white/10">
              <ShoppingCart className="text-white" size={18} />
              <span className="absolute -top-1 -right-1 text-[10px] bg-yellow-400 text-black rounded-full px-[5px]">
                3
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
