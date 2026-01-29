import { ShoppingBag, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { cartCount, setIsSidebarOpen } = useCart();
  return (
    <nav className="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <Zap className="text-primary w-6 h-6" /> AtruStore
        </div>
        <button onClick={() => setIsSidebarOpen(true)} className="relative p-2 text-slate-300 hover:text-white">
          <ShoppingBag />
          {cartCount > 0 && <span className="absolute top-0 right-0 bg-primary text-slate-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
};