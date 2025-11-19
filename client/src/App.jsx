import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./pages/Footer";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import OfferNavbar from "./components/OfferNavbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Router>
      <OfferNavbar />

      <div className="mt-[37px]">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/check-out" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
