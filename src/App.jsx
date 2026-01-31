import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { CartSidebar } from "./components/CartSidebar";
import { Home } from "./pages/Home"; // <--- Verifique se esse arquivo existe!
import { ProductDetails } from "./pages/ProductDetails"; // <--- Verifique se esse arquivo existe!

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-slate-950 font-sans">
          <Toaster position="bottom-right" theme="dark" richColors />

          {/* Navbar e Sidebar aparecem em todas as telas */}
          <Navbar />
          <CartSidebar />

          {/* Aqui é onde a mágica das páginas acontece */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
