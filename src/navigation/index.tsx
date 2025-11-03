import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Profile from "../pages/UserDashboard/Profile";
import Addresses from "../pages/Addresses";
import PaymentStatus from "../pages/PaymentStatus";
import Receipt from "../pages/Receipt";
import About from "../pages/About";
import Contact from "../pages/Contact";
import LoginPage from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register";
import UserDashboardPage from "../pages/UserDashboard/UserDashboard";
import UserProducts from "../pages/UserDashboard/userProducts";
import UserSubscriptions from "../pages/UserDashboard/Subscriptions";
import AdminDashboard from "../pages/AdminDashboard/Dashboard";
import AdminProducts from "../pages/AdminDashboard/Products";
import Revenue from "../pages/AdminDashboard/Revenue";
import AdminUsers from '../pages/AdminDashboard/Users';

export const Navigation = () => (
  <Routes>
    {/* Landing Page Route */}
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/addresses" element={<Addresses />} />
    <Route path="/payment/status" element={<PaymentStatus />} />
    <Route path="/receipt/:id" element={<Receipt />} />
    <Route path="/about" element={<About />} />

    {/* Admin Route */}
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/products" element={<AdminProducts />} />
    <Route path="/admin/users" element={<AdminUsers />} />
     <Route path="/admin/orders" element={<Orders />} />
    <Route path="/admin/revenue" element={<Revenue />} />


    {/* Auth Route */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    {/* User Route */}
    <Route path="/user/dashboard" element={<UserDashboardPage />} />
    <Route path="/user/subscriptions" element={<UserSubscriptions />} />
    <Route path="/user/profile" element={<Profile />} />
    <Route path="/user/products" element={<UserProducts />} />

    {/* Fallback Route */}
    <Route path="*" element={<Home />} />
  </Routes>
);
