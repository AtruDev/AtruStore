import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../@types/store';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  return (
    <div className="bg-surface rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 group flex flex-col shadow-lg hover:shadow-[0_0_15px_rgba(172,200,162,0.15)]">
      <Link to={`/product/${product.id}`} className="h-56 overflow-hidden block bg-black/20">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
        />
      </Link>
      
      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs text-primary font-bold uppercase tracking-widest mb-2">
          {product.category}
        </span>
        
        <Link to={`/product/${product.id}`}>
           <h3 className="font-display text-white text-2xl my-1 hover:text-primary transition-colors tracking-wide uppercase">
             {product.name}
           </h3>
        </Link>
        
        <div className="flex justify-between items-center mt-auto pt-6">
          <span className="text-white font-bold text-2xl font-sans">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
          </span>
          <button 
            onClick={() => addToCart(product)} 
            className="p-3 bg-primary/10 border border-primary/20 hover:bg-primary text-primary hover:text-background rounded-xl transition-all active:scale-95 shadow-sm"
            aria-label="Adicionar ao carrinho"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};