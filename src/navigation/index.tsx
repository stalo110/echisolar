import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
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
import Users from '../pages/AdminDashboard/Users';
import Projects from "../pages/Projects";
import AdminProjects from "../pages/AdminDashboard/Projects";
import AdminOrders from "../pages/AdminDashboard/Orders";

export const Navigation = () => (
  <Routes>
    {/* Landing Page Route */}
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/addresses" element={<Addresses />} />
    <Route path="/payment/status" element={<PaymentStatus />} />
    <Route path="/receipt/:id" element={<Receipt />} />
    <Route path="/about" element={<About />} />

    {/* Admin Route */}
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/products" element={<AdminProducts />} />
    <Route path="/admin/users" element={<Users />} />
     <Route path="/admin/orders" element={<AdminOrders />} />
    <Route path="/admin/revenue" element={<Revenue />} />
      <Route path="/admin/projects" element={<AdminProjects />} />


    {/* Auth Route */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    {/* User Route */}
    <Route path="/user/dashboard" element={<UserDashboardPage />} />
    <Route path="/user/subscriptions" element={<UserSubscriptions />} />
    <Route path="/user/profile" element={<Profile />} />
    <Route path="/user/products" element={<UserProducts />} />

    {/* Fallback Route if not found */}
    <Route path="*" element={<Home />} />
  </Routes>
);
