import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { WishlistProvider } from "./context/WishlistContext";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { CartSidebar } from "./components/CartSidebar";
import { BottomNav } from "./components/BottomNav";
import { Home } from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import { Wishlist } from "./pages/Wishlist";
import { Checkout } from "./pages/Checkout";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <CartProvider>
          <div className="min-h-screen bg-transparent font-sans text-slate-200 selection:bg-primary selection:text-background pb-16 md:pb-0">
          <Toaster position="bottom-right" theme="dark" richColors />

          <Navbar />
          <CartSidebar />

          <AnimatedRoutes />
            <BottomNav />
          </div>
        </CartProvider>
      </WishlistProvider>
    </BrowserRouter>
  );
}