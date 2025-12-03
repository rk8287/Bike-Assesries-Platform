import React, { useState } from "react";
import { Menu, Search, Heart, User, ShoppingCart, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, i) => acc + (i.qty || 1), 0);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // 🔥 SEARCH SUBMIT FUNCTION
  const submitSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/products?search=${searchQuery.trim()}`);
    setSearchQuery("");
  };

  return (
    <>
      {/* Desktop Navbar */}
      <header className="hidden sm:block fixed w-full top-11 z-40 bg-black backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-200 animate-gradient-x">
                Bullet Meri Jaan
              </h1>
            </Link>

            {/* Search */}
            <div className="flex-1 px-4">
              <div className="relative max-w-md mx-auto">
                <input
                  className="w-full pl-4 pr-10 py-2 rounded-full bg-white/10 text-white placeholder:text-white/50 outline-none border border-white/10"
                  placeholder="Search accessories, bikes, parts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                />
                <button
                  onClick={submitSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <Search className="text-white" size={18} />
                </button>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-md hover:bg-white/10">
                <Heart className="text-white" size={18} />
              </button>
              <Link to={user ? "/profile" : "/login"}>
                <User className="text-white" size={18} />
              </Link>
              <Link to="/cart" className="relative p-2 rounded-md hover:bg-white/10">
                <ShoppingCart className="text-white" size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-[10px] bg-yellow-400 text-black rounded-full px-[5px]">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navbar */}
      <header className="sm:hidden fixed w-full top-11 z-40 bg-black backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="text-white" size={20} /> : <Menu className="text-white" size={20} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center justify-center flex-1 gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-200 animate-gradient-x truncate">
              Bullet Meri Jaan
            </h1>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2 rounded-md hover:bg-white/10">
            <ShoppingCart className="text-white" size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-yellow-400 text-black rounded-full px-[5px]">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Search */}
        <div className="px-4 py-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search accessories, bikes, parts..."
              className="w-full pl-4 pr-10 py-2 rounded-full bg-white/10 text-white placeholder:text-white/50 outline-none border border-white/10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitSearch()}
            />
            <button
              onClick={submitSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Search className="text-white" size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden bg-black`}
        >
          <div className="flex flex-col gap-2 px-4 py-3">
            <Link
              to={user ? "/profile" : "/login"}
              className="text-white font-medium p-2 rounded-md hover:bg-white/10 transition w-full text-center"
            >
              Profile
            </Link>
            <button className="text-white font-medium p-2 rounded-md hover:bg-white/10 transition w-full text-center">
              Wishlist
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
