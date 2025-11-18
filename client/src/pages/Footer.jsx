import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaLock,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white pt-14 pb-10 mt-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">
            Dug Dug Motorcycles
          </h2>
          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            Premium aftermarket accessories and parts for Royal Enfield & modern
            classic motorcycles. Trusted by thousands of riders.
          </p>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Customer Care
          </h3>
          <ul className="space-y-2 text-white/70 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">Help Center</li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Shipping & Returns
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">Warranty</li>
            <li className="hover:text-yellow-400 cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-white/70 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">Accessories</li>
            <li className="hover:text-yellow-400 cursor-pointer">About Us</li>
            <li className="hover:text-yellow-400 cursor-pointer">Track Order</li>
            <li className="hover:text-yellow-400 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Social + Payment Icons */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Stay Connected</h3>
          
          {/* Social */}
          <div className="flex items-center gap-4 text-xl mb-4">
            <FaInstagram className="hover:text-yellow-400 cursor-pointer" />
            <FaFacebook className="hover:text-yellow-400 cursor-pointer" />
            <FaYoutube className="hover:text-yellow-400 cursor-pointer" />
          </div>

          {/* Payment Icons */}
          <h4 className="text-sm font-semibold text-white mb-2">100% Secure Payments</h4>
          <div className="flex items-center gap-4 text-3xl">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
            <FaLock className="text-green-400" />
          </div>

          <p className="text-xs text-white/60 mt-2">
            Your payments are safe & encrypted.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} Dug Dug Motorcycles. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
