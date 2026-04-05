import { House, MagnifyingGlass, Heart, Handbag } from '@phosphor-icons/react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const BottomNav = () => {
  const location = useLocation();
  const { cartCount, setIsSidebarOpen } = useCart();

  const navItems = [
    { icon: House, label: 'Início', path: '/' },
    { icon: MagnifyingGlass, label: 'Busca', path: '/search', disabled: true },
    { icon: Heart, label: 'Favoritos', path: '/wishlist' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-lg border-t border-white/10 z-40 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return item.disabled ? (
            <div key={item.label} className="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-600 cursor-not-allowed">
              <item.icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </div>
          ) : (
            <Link 
              key={item.label}
              to={item.path} 
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <item.icon size={20} className={isActive ? 'drop-shadow-[0_0_8px_rgba(172,200,162,0.5)]' : ''} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
        
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="relative flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <div className="relative">
            <Handbag size={20} weight="bold" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-primary text-slate-900 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Carrinho</span>
        </button>
      </div>
    </div>
  );
};
