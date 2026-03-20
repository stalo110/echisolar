import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Packages from "../pages/Packages";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Profile from "../pages/UserDashboard/Profile";
import Addresses from "../pages/Addresses";
import PaymentStatus from "../pages/PaymentStatus";
import Receipt from "../pages/Receipt";
import About from "../pages/About";
import Contact from "../pages/Contact";
import DeliveryInfo from "../pages/DeliveryInfo";
import LoginPage from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register";
import ForgotPasswordPage from "../pages/Auth/ForgotPassword";
import ResetPasswordPage from "../pages/Auth/ResetPassword";
import UserDashboardPage from "../pages/UserDashboard/UserDashboard";
import UserProducts from "../pages/UserDashboard/userProducts";
import UserPackages from "../pages/UserDashboard/Packages";
import UserSubscriptions from "../pages/UserDashboard/Subscriptions";
import AdminDashboard from "../pages/AdminDashboard/Dashboard";
import AdminProducts from "../pages/AdminDashboard/Products";
import AdminPackages from "../pages/AdminDashboard/Packages";
import Revenue from "../pages/AdminDashboard/Revenue";
import Projects from "../pages/Projects";
import AdminProjects from "../pages/AdminDashboard/Projects";
import AdminOrders from "../pages/AdminDashboard/Orders";
import AdminUsers from "../pages/AdminDashboard/AdminUsers";
import AdminMessages from "../pages/AdminDashboard/Messages";
import NotFound from "../pages/NotFound";

export const Navigation = () => (
  <Routes>
    {/* Landing Page Route */}
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/packages" element={<Packages />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/delivery-info" element={<DeliveryInfo />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/addresses" element={<Addresses />} />
    <Route path="/payment/status" element={<PaymentStatus />} />
    <Route path="/verify-payment" element={<PaymentStatus />} />
    <Route path="/order/success" element={<PaymentStatus />} />
    <Route path="/order/failed" element={<PaymentStatus />} />
    <Route path="/paystack/callback" element={<PaymentStatus />} />
    <Route path="/flutterwave/callback" element={<PaymentStatus />} />
    <Route path="/receipt/:id" element={<Receipt />} />
    <Route path="/about" element={<About />} />

    {/* Admin Route */}
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/products" element={<AdminProducts />} />
    <Route path="/admin/packages" element={<AdminPackages />} />
    <Route path="/admin/users" element={<AdminUsers />} />
     <Route path="/admin/orders" element={<AdminOrders />} />
    <Route path="/admin/revenue" element={<Revenue />} />
      <Route path="/admin/projects" element={<AdminProjects />} />
    <Route path="/admin/messages" element={<AdminMessages />} />


    {/* Auth Route */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />

    {/* User Route */}
    <Route path="/user/dashboard" element={<UserDashboardPage />} />
    <Route path="/user/subscriptions" element={<UserSubscriptions />} />
    <Route path="/user/packages" element={<UserPackages />} />
    <Route path="/user/profile" element={<Profile />} />
    <Route path="/user/products" element={<UserProducts />} />

    {/* Fallback Route if not found */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
