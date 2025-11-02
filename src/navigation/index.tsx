import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import AdminProducts from "../pages/AdminProducts";
import AdminDashboard from "../pages/AdminDashboard";
import Addresses from "../pages/Addresses";
import PaymentStatus from "../pages/PaymentStatus";
import Receipt from "../pages/Receipt";
import About from "../pages/About";
import Contact from "../pages/Contact";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import UserDashboardPage from "../pages/UserDashboard";
import AdminUsers from "../pages/AdminUsers";



export const Navigation = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/payment/status" element={<PaymentStatus />} />
        <Route path="/receipt/:id" element={<Receipt />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<UserDashboardPage />} />
        <Route path="*" element={<Home />} />
    </Routes>
);
