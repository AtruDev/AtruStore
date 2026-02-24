import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { CartSidebar } from "./components/CartSidebar";
import { Home } from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-background font-sans text-slate-200 selection:bg-primary selection:text-background">
          <Toaster position="bottom-right" theme="dark" richColors />

          <Navbar />
          <CartSidebar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}