import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RouteTransition from './components/RouteTransition';

// Admin Import
import AdminLayout from './components/admin/AdminLayout';
import AdminRoute from './components/admin/AdminRoute';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';

// Customer Imports
import CustomerLayout from './components/layout/CustomerLayout';
import Hero from './components/home/Hero';
import FeaturedProducts from './components/home/FeaturedProducts';
import Shop from './pages/shop/Shop';
import ProductDetails from './pages/shop/ProductDetails';

import Cart from './pages/shop/Cart';

import OurStory from './pages/story/OurStory';
import Wishlist from './pages/shop/Wishlist';
import Contact from './pages/Contact';
import OrderSuccess from './pages/OrderSuccess';


// Page Wrappers
const HomePage = () => (
  <CustomerLayout>
    <Hero />
    <FeaturedProducts />
  </CustomerLayout>
);

const ShopPage = () => (
  <CustomerLayout>
    <Shop />
  </CustomerLayout>
);

const ProductPage = () => (
  <CustomerLayout>
    <ProductDetails />
  </CustomerLayout>
);

const CartPage = () => (
  <CustomerLayout>
    <Cart />
  </CustomerLayout>
);

const StoryPage = () => (
  <CustomerLayout>
    <OurStory />
  </CustomerLayout>
);

const WishlistPage = () => (
  <CustomerLayout>
    <Wishlist />
  </CustomerLayout>
);

const OrderSuccessPage = () => (
  <CustomerLayout>
    <OrderSuccess />
  </CustomerLayout>
);

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <RouteTransition key={location.pathname} />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Customer Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />


          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<div className="p-4">Customers Page</div>} />
            <Route path="settings" element={<div className="p-4">Settings Page</div>} />
          </Route>

          <Route path="*" element={<div className="p-10 text-center">404 Not Found</div>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

function App() {
  console.log("App Rendering...");
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
