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
import { Toaster } from "sonner";

// Admin
import AdminDashboard from "./admin/AdminDashboard";
import ContactsPage from "./admin/ContactsPage";
import ProductPage from "./admin/ProductPage";
import UsersPage from "./admin/UsersPage";
import CreateProduct from "./admin/CreateProduct";

import ProtectedRoute from "./components/ProtectedRoute";
import PreventAuthRoute from "./components/PreventAuthRoute";
import AdminRoute from "./components/AdminRoute";
import Products from "./pages/Products";
import SuccessPage from "./pages/SuccessPage";
import CheckoutRoute from "./components/CheckoutRoute";
import SuccessRoute from "./components/SuccessRoute";
import AdminOrder from "./admin/AdminOrder";
import AdminOrderView from "./admin/AdminOrderView";

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Router>
        <OfferNavbar />
        <Navbar />

        <div className="pt-[92px] sm:pt-[108px]">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={
                <PreventAuthRoute>
                  <Login />
                </PreventAuthRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <PreventAuthRoute>
                  <Signup />
                </PreventAuthRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/check-out"
              element={
                <ProtectedRoute>
                  <CheckoutRoute>
                    <CheckoutPage />
                  </CheckoutRoute>
                </ProtectedRoute>
              }
            />

            <Route path="/products" element={<Products />} />

            <Route path="/product/:id" element={<ProductDetails />} />
            <Route
              path="/success/:id"
              element={
                <SuccessRoute>
                  <SuccessPage />
                </SuccessRoute>
              }
            />

            {/* Admin Protected */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminOrder />
                </AdminRoute>
              }
            />

            <Route path="/admin/order/:id" element={<AdminRoute><AdminOrderView /></AdminRoute>} />


            <Route
              path="/admin/contact"
              element={
                <AdminRoute>
                  <ContactsPage />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/product"
              element={
                <AdminRoute>
                  <ProductPage />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UsersPage />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/createProduct"
              element={
                <AdminRoute>
                  <CreateProduct />
                </AdminRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
