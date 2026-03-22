import { ShoppingBag, Zap, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom'; // 

export const Navbar = () => {
  const { cartCount, setIsSidebarOpen } = useCart();
  const { wishlistIds } = useWishlist();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
          <Zap className="text-primary w-6 h-6" />   
          <span className="font-display text-2xl tracking-wider pt-1">ATRUSTORE</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/wishlist" className="relative p-2 text-slate-300 hover:text-white transition-colors hidden sm:block">
            <Heart />
            {wishlistIds.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </Link>

          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="relative p-2 text-slate-300 hover:text-white transition-colors"
            aria-label="Abrir carrinho"
          >
            <ShoppingBag />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-slate-900 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};