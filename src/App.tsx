import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Chatbot from './components/ui/Chatbot';

// Pages
import LandingPage       from './pages/LandingPage';
import ProductsPage      from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage          from './pages/CartPage';
import ContactPage       from './pages/ContactPage';
import LoginPage         from './pages/LoginPage';
import CheckoutPage      from './pages/CheckoutPage';
import DashboardPage     from './pages/DashboardPage';
import AdminPage         from './pages/AdminPage';
import AboutPage         from './pages/AboutPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const hideLayout = ['/login'].includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"            element={<LandingPage />} />
          <Route path="/products"    element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart"        element={<CartPage />} />
          <Route path="/login"       element={<LoginPage />} />
          <Route path="/contact"     element={<ContactPage />} />
          <Route path="/about"       element={<AboutPage />} />

          {/* Protected routes — require Clerk sign-in */}
          <Route path="/checkout"  element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/admin"     element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
      {!hideLayout && <Footer />}
      {!hideLayout && <Chatbot />}
    </>
  );
}
