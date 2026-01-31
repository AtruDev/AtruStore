import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-primary/50 transition-all group flex flex-col">

      <Link to={`/product/${product.id}`} className="h-48 overflow-hidden block">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
      </Link>
      
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs text-primary font-bold uppercase tracking-wider">{product.category}</span>
        
        <Link to={`/product/${product.id}`}>
           <h3 className="text-white font-bold text-lg my-1 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        
        <div className="flex justify-between items-center mt-auto pt-4">
          <span className="text-white font-bold text-xl">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
          </span>
          <button 
            onClick={() => addToCart(product)} 
            className="p-2 bg-slate-700 hover:bg-primary text-white hover:text-slate-900 rounded-lg transition-colors shadow-lg"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};