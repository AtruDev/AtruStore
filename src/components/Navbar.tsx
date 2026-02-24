import { ShoppingBag, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom'; // 

export const Navbar = () => {
  const { cartCount, setIsSidebarOpen } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
          <Zap className="text-primary w-6 h-6" />   
          <span className="font-display text-2xl tracking-wider pt-1">ATRUSTORE</span>
        </Link>
        
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="relative p-2 text-slate-300 hover:text-white transition-colors"
          aria-label="Abrir carrinho"
        >
          <ShoppingBag />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-primary text-slate-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};