import { X, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartSidebar = () => {
  const { cart, isSidebarOpen, setIsSidebarOpen, updateQuantity, removeFromCart, cartTotal } = useCart();
  if (!isSidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      <div className="relative w-full max-w-md bg-slate-900 h-full border-l border-slate-800 flex flex-col animate-slide-in p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Carrinho</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-white"><X /></button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 bg-slate-800 p-3 rounded-lg">
              <img src={item.image} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <h4 className="text-white text-sm font-bold">{item.name}</h4>
                <p className="text-primary font-bold">R$ {item.price.toFixed(2)}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-400 hover:text-white"><Minus size={16}/></button>
                  <span className="text-white text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-400 hover:text-white"><Plus size={16}/></button>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 ml-auto"><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-slate-800">
          <div className="flex justify-between text-white font-bold text-xl mb-4"><span>Total</span><span>R$ {cartTotal.toFixed(2)}</span></div>
          <button className="w-full bg-primary text-slate-900 font-bold py-3 rounded-lg hover:bg-emerald-600">Finalizar</button>
        </div>
      </div>
    </div>
  );
};