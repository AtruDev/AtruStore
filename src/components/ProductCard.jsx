import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-primary/50 transition-all group">
      <div className="h-48 overflow-hidden"><img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" /></div>
      <div className="p-5">
        <span className="text-xs text-primary font-bold uppercase">{product.category}</span>
        <h3 className="text-white font-bold text-lg my-1">{product.name}</h3>
        <div className="flex justify-between items-center mt-4">
          <span className="text-white font-bold text-xl">R$ {product.price.toFixed(2)}</span>
          <button onClick={() => addToCart(product)} className="p-2 bg-slate-700 hover:bg-primary text-white hover:text-slate-900 rounded-lg"><Plus /></button>
        </div>
      </div>
    </div>
  );
};